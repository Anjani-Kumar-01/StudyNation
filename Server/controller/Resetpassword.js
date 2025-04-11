const User = require("../models/User");
// const User = require("../models/User");
const mailSender = require("../utils/mailSender"); 
const bcrypt = require("bcrypt");
// resetpaswordtoken
exports.resetPasswordToken = async(req,res)=>{
   try{
 //get email from req body
 const email = req.body.email;
 //email validation
 const User = await User.findOne({email:email});
 if(!User){
     return res.json({success:false,
         message:"your email is not registered"
     });
 }
//generate token
 const token = crypto.randomUUID();
//update user
const UpdatedDetails = await User.findOneAndUpdate({email:email},
 {
token:token,
resetPasswordExpires:Date.now()  + 5*60*1000,
 },
 {new:true});

//create url
const url = `https://localhost:3000/update-password/${token}`
//sent mail
await mailSender (
 email,
 'password reset link',
 `passsword Reset Link : ${url}`); 
//return response
return res.json({
   success:true,
   message:"email sent successfully ,plase change your password",
});
 

   }catch(error){
  console.log(error);
     return res.status(500).json({
        success:false,
        message:"error in sending mail, please try again  "
     });
   }
}

//reset password
exports.resetPassword = async(req,res)=>{
    //data fetch
try{
    const {password,confirmPassword,token}= req.body;
    //validation
    if(password!=confirmPassword){
         return res.status({
            success:false,
            message:"password donnot match"
         })
    }
    //get userdetails from db 
    const userDetails = await User.findOne({token:token});

    //if no entry invalid token
    if(!token){
        return res.json({
            success:false,
            message:"invalid token"
        })
    }
    //token time check
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.json({
            success:false,
            message:"token is expire"

        })
    }
    //hashpassword
     const hashpassword = await bcrypt.hash(password,10);
    //update password
    await User.findOneAndUpdate(
        {token:token},
        {password:hashpassword},
        {new:true},
);
    // return res
     return res.status(201),json({
        success:true,
        message:"possword reset successfully"
     })


}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'something went wrong'
    })
}
}

