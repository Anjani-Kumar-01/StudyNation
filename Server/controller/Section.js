const Section = require("../models/Section");

const Course = require("../models/Course");

exports.createSection = async(req,res)=>{
    try{
        //data fetch
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course whth section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                     courseId,
                                                     {
                                                        $push:{
                                                            courseContent:newSection._id,
                                                        }
                                                     },
                                                     {new:true}
                                                     .populate({
                                                        path: "courseContent",
                                                        populate: {
                                                            path: "subsections", // Populate subsections inside each section
                                                            model: "SubSection",
                                                        }
                                                    })
    )
        //return res
        return res.status(200).json({
            success:true,
            message:'section created successfully',
            updatedCourseDetails,
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:' error in creating section section',
            updatedCourseDetails,
        })
    }
}

exports.updateSection = async(req,res)=>{
    try{
          //data input
          const {sectionName,sectionId} = req.body;

          //data validation
          if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

          //update data
          const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
          //return res
          return res.status(200).json({
            success:true,
            message:"updated successfully"
          })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            error:error.message
        });
    }
};

exports.deleteSection = async(req,res)=>{
    try{
        //get id
        const {sectionId} = req.params;
        //use find by id and delete
        await Section.findbyIdAndDelete(sectionId);
        //return res
        return res.status(200).json({
            success:true,
            message:"section deleted successfully"
        })
    }
    catch(error){
        req.status(500).json({
            success:false,
            message:"something went wrong",
            error:error.message,
        });

    }
}

