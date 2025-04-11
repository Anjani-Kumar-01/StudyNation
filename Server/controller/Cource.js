const Course = require("../models/Course");
const Tag = require("../models/Catogery");
const User = require("../models/User");
const {uploadImageToCloudinary } = require("../utils/imageUploader");

//createcource handeler function
exports.createCourse = async(req,res)=>{
     try{
        //data fetch
        const {courceName,courceDescription,whatYouWillLearn,price,tag}= req.body;
          //thumbnail
           const thumbnail = req.files.thumbnailImage;
    //validation
    if(!courceName || !courceDescription ||!whatYouWillLearn ||!price || !tag ||!thumbnail){
          return res.status(400).json({
            success:false,
            message:'All fields are required'
          });
    }
    //instructor level validation
      const UserId = req.User.id;
      const instructorDetails = await User.findById(UserId);
      console.log( "instructor details" ,instructorDetails);
      if(!instructorDetails){
        return res.status(404).json({
          success:false,
          message:"instructor details not found"
        });
      }
    //tag level validation
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
          return res.status(404).json({
            success:false,
            message:"tag details not found"
          });

        }
        //upload image to cloudanary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry of new cource
        const newCourse = await Course.create({
          courseName,
          courseDescription,
          insctructor:instructorDetails._id,
          whatYouWillLearn:whatYouWillLearn,
          price,
          tag:tagDetails._id,
          thumbnail:thumbnailImage.secure_url,


        })
        //add the new course to the user schema of instructor
         await User.findByIdAndUpdate(
          {_id:instructorDetails._id},
          {
            $push:{
              courses:newCourse._id,

            }
          },
          {new:true},
         );
         //update tag schema
  //HW

    //return res
    return res.status(200).json({
      success:true,
      message:'course created successfully',
      data:newCourse,
    });

     }catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"failed to create course"
      })


     }
};
   




//show all cource handeler function
exports.showAllCourses = async(req,res)=>{
  try{
     const showAllCourses = await Course.find({},{courseName:true,
                                                  price:true,
                                                  thumbnail:true,
                                                  insctructor:true,
                                                  ratingAndReviews:true,
                                                  studentsEnrolled:true, })
                                                  .populate("instructor")
                                                  .exec();
          return res.status(200).json({
            success:true,
            message:'data for all courses fetch successfully '
          })
  }catch(error){ 
    console.log(error);
    return res.status(500).json({
            success:false,
            message:'cannot fetch course data',
            error:error.message,
      });
  }
}

exports.getCourseDetails = async(req,res)=>{
  try{
    //get id
    const {courseId}= req.body;
    //find course details
    const courseDetails = await Course.find(
                                  {_id:courseId})
                                  .populate(
                                    {
                                      path:"instructor",
                                      populate:{
                                        path:"additionalDetails",
                                      },
                                    }
                                  )
                                  .populate("category")
                                  .populate("ratingAndReview")
                                  .populate({
                                    path:"courseContent",
                                    populate:{
                                      path:"subSection"
                                    },
                                  }).exec();

    //validate
    if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`could not find the course with ${courseId}`,
      });
    }
    //return res
    return res.status(200).json({
      success:true,
      message:"Course Details fetched successfully",
      data:courseDetails,

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