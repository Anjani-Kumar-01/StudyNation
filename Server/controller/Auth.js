const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const Profile = require("../models/Profile")
const JWT = require("jsonwebtoken");
require ("dotenv").config();
// sent otp
exports.sendOTP = async(req,res)=>{
    try{

const {email} = req.body;
 const checkUserPresent = await User.findOne({email}) ;

  if(checkUserPresent){
    return res.status(401).json({
        success:false,
        message:'user already exist'
    })
  }
  //otp generate
  var otp =otpgenerator.generate(6,{
      upperCaseAlphabets:false,
      lowerCaseAlphabets:false,
      specialChars:false,
  });
  console.log("otp generated",otp)
  //check uniqueness
   const result = await OTP.findOne({otp:otp});
   while(result){
    otp= otpgenerator(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    const result = await OTP.findOne({otp:otp});
   }

   const otppayload={email,otp};
   const otpBody = await OTP.create(otppayload);
   console.log(otpBody);
   //return response 
     res.status(200).json({
        success:true,
        message:"OTP sent sucessfully",
        otp,
     })

}catch(error){
    console.log(error);

    }
};
// signup
exports.signUp = async (req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword ||!otp ){
            return res.status(403).json({
                success:false,
                message:"all fields are required",
            })
        }
        // 2 2 password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'password doesnot match,try again'
            })
        }
        // check user alrady exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status (400).json({
                success:false,
                message:'user already register'
            })
        }
        // find most recent otp stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recentotp",recentOtp[0].otp);
        // validate otp
        if(recentOtp.length ==0){
            return res.status(400).json({
                success:false,
                message:'otp not found'
            })
        }else if (otp !==recentOtp[0].otp){
            //invalid otp
            return res.status(400).json({
                success:false,
                message:'invalid otp'
            })
        }
        //hash password
         const hashPassword = await bcrypt.hash(password,10);
        
        //
        
        
         // entry in DB
         const  profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
         });
         const user = await User.create({
            firstName,
            lastName,
             email,
             contactNumber,
             password:hashPassword,
             accountType,
             additionalDetails:profileDetails._id,
             Image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        
         })
         //return res
         return res.status(200).json({
            success:true,
            message:'user register succesfully',
            user,
         })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong'
        })

    }
}


//login
exports.login = async (req,res)=>{
   try{
 // get data from req body
 const {email,password} = req.body;
 //validate data
 if(!email || !password){
    return res.status(403).json({
        success:false,
        message:'All fields are required ,please try again',
    });
 }
 //user check exist or not
 const user = await User.findOne({ email }).populate("additionalDetails")
 if(!user){
     return res.status(401).json({
        success:false,
        message:"user doesnot exist",
        
     })
   
 }
 //generateJWT after password match
   if(await bcrypt.compare(password,user.password)){
    const payload = {
        email:user.email,
        id:user._id,
        accountType:user.accountType,
    }
        
    
    const  token = JWT.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h",
    });
    user.token = token;
    user.password = undefined;
  
 //create cookie and send response
 const Option ={
    expires: new Date(Date.now()+ 3*24*60*60*100),
    httpOnly:true,
 }
 res.cookie("token",token,Option).status(200).json({
    success:true,
    token,
    user,
    message:'login successfully'
 });
}else{
   return res.status(401).json({
    success:false,
    message:"password is incorrect"
   });
 }
   }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"something went wrong "
    })

   }
};
//change password
exports.changePassword = async(req,res)=>{
    try{
// get  data from req body
const { currentPassword, password, confirmPassword } = req.body;
const  userId  = req.user._id;
    //get old password ,new password ,confirm password
    if (password !== confirmPassword) return res.status(400).send('confirmpassword do not same');
    const userData = await User.findById(userId);
    if (!userData) return res.status(404).json({success:false, message:'User not found'});

    //validation
    const isMatch = await bcrypt.compare(currentPassword, userData.password);
    if (!isMatch) return res.status(400).send('Passwords do not match.');

      //hash pass
      const hashedPassword = await bcrypt.hash(password, 10);
      if(!hashedPassword) return res.status(400).send("Password Can't Hashed");
    //update password in DB
    userData.password = password;
    await userData.save();

    // sent email
    // return response
    return res.status(200).json({success:true,message:'Password changed successfully'});
} catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
}
    
}

