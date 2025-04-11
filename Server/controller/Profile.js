const user = require("../models/User");
const profile = require("../models/Profile");

exports.updateProfile = async (req,res)=>{
    try{
        //get data 
        const  {dateOfBirth ="",about ="",contactNumber,gender}= req.body;

        //get userid
        const id = req.user.id;
        //validate data
        if(!contactNumber ||!gender){
            return res.status(400).json({
                success:false,
                message:"All details are required"
            });
        }
        //find profile
         const userDetails = await user.findById(id);
         const profileId = userDetails.additionalDetails;
         const profileDetails = await profile.findById(profileId);
        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.about = about;
        profileDetails.gender = gender;
         await profileDetails.save();
        //return res
         return res.status(200).json({
             success:false,
             message:"profile updated successfully",
             profileDetails,
         })



    }
    catch(error){
        console.log(error);
          return res.status(500).json({
            success:false,
            message:"something went wrong",
            error: error.message,
          })
    }
};

//delete account
exports.deleteAccount = async(req,res)=>{
   try{
    //get id
    const id = req.user.id
    //validation
    const userDetails = req.findById(Id);
    if(!userDetails){
        return res.status(404).json({
            success:false,
            message:"user not found"
        });
    }
    //delete profile
    await profile.findByIdAndDelete({_id:userDetails.additionalDetails});
    //HW entroll count of all student
    //delete user
    await user.findByIdAndDelete({_id:id})
    //return res
    return res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })

   }
   catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong",
            error:error.message,
        });
   }
};

exports.getAllUserDetails = async(req,res)=>{
    try{
        //get id 
        const id = req.user.id;
        //validation and get userdetails
        const userDetails = await user.findById(id).populate("additionaldetails").exec();
        //return res
        return res.status(200).json({
            success:true,
            message:"user details fetched successfully",
        })

    }catch(error){
        req.status(500).json({
            success:false,
            message:"something went wrong",
            error:error.message,
        });
    }
}