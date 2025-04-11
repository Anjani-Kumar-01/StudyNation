const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
//create rating
exports.createRating = async (req,res)=>{
    try{
        //get user id
        const userId = req.User.id;
        //fetch data from user body
        const {rating,review,courseId} = req.body;
         //check if user enrolled or not
         const courseDetails = await Course.findOne(
                                                   {_id:courseId,
                                                    studentsEnrolled:{$eleMatch:{$eq:userId}},
                                                   });
         if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'student is not enrolled in the course'
            });
         }
         //check user already reviewed the course 
         const alradyReviewed = await RatingAndReview.findOne({
                                     User:userId,
                                     Course:courseId,
                                        });
      if(alradyReviewed){
        return res.status(404).json({
            success:false,
            message:"course is already reviewed by user"
        });
      }

         //create rating and review
         const ratingReview = await RatingAndReview.create({
                                               rating,review,
                                               Course:courseId,
                                               User:userId,
                                                });
         //update course with this rating/review
         await Course.findByIdAndUpdate(courseId,
                                                    {
                                                        $push:{
                                                            ratingAndReview:ratingReview,
                                                        }
                                                    },
                                                    {new:true});
         // return res
         return res.status(200).json({
            success:true,
            message:"rating and review created successfully",
            ratingReview,
         });
 }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }
}




//getAvgrating
exports.getAverageRating = async(req,res)=>{
    try{
       //get course id
       const courseId = req.body.courseId;
       //calculate Avg rating
       const result =await RatingAndReview.aggregate([
        {
            $match:{
                Course:new mongoose.Types.ObjectId(courseId),
         },
        },
         {
            $group:{
                _id:null,
                averageRating: { $avg: "$rating"},
            }
         }

       ]);
       //return rating
       if(result.length > 0 ){
          return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating,
          })
       }

       ///if no rating exist
       return res.status(200).json({
        success:false,
        message:'Average rating is 0, no rating given till now',
        averageRating:0,
       });
  }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
 }
},


//fetAllRating
exports.getAllRating = async (req,res)=>{
       try{
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating:"desc"})
                                                .populate({
                                                    path:"user",
                                                    Select:"firstName lastName email image",
                                                })
                                                .populate({
                                                    path:Course,
                                                    Select:"courseName",
                                                })
                                                .exec();
//return res
return res.status(200).json({
    success:true,
    message:"All reviews fetched successfully ",
    data:allReviews,
});
                                                

} catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
 }
       
}