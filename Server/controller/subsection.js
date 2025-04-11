const SubSection = require("../models/Subsection");
const section = require('../models/Section');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
//create section

exports.createSubSection = async (req,res)=>{
    try{
      //fetchdata
      const {sectionId,title,timeDuration,description} = req.body;
      //extract file
      const video = req.files.videoFile;
      //validate
         if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:true,
                message:"all fields are required",
            });
         }
      //upload video to cloudenery
const uploadDetails = await uploadImageToCloudinary (video,process.env.FOLDER_NAME);
      //create a sub section
      const SubSectionDetails = await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url,
      })
      //update section with this sub section objectId
       const updatedSection= await section.findByIdAndUpdate({_id:sectionId},
                                                             {$push:{
                                                                SubSection:SubSectionDetails._id,
                                                             }},
                                                             {new:true}
                                                             .populate()                                             
       )  
      //return res
      return res.status(200).json({
        success:true,
        message:"sub sections updated successfully",
        updatedSection,
      });
    }
    catch(error){
          return res.status(500).json({
            success:false,
            message:"something went wrong"
          })
    }
}