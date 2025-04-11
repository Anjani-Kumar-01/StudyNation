const catogery = require("../models/Catogery");

//create tag api
exports.createCatogery = async(req,res)=>{
    try{
        //fetch data
    const {name,description} = req.body;
    //validate data
    if(!name || !description){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    //entry in DB
    const catogeryDetails = await catogery.create({
        name:name,
        description:description,
    });
    console.log(catogeryDetails);

    //return res
    return res.status(200).json({
        success:true,
        message:"catogery created successfully"
    })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//get all tags
exports.showAllcatogery = async(req,res)=>{
    try{
       const Allcatogery = await Tag.find({},{name:true,description:true});
       return res.status(200).json({
        success:true,
        message:"All catogery returns successfully"
       })



    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
},

exports.catogeryPageDetails = async(req,res)=>{
    try{
        //get catogery id
        const {catogeryId} = req.body;
        //get courses for specified catogeryId
        const selectedCatogery = await catogery.findById(catogeryId)
                                                         .populate("courses")
                                                         .exec();
        //validation
        if(!selectedCatogery){
            return res.status(404).json({
                success:false,
                message:"data not found",
            });
        }
        //get courses for diffrernt catigeries
        const diffrerntCategories = await catogery.find({
                                                    _id:{$ne:catogeryId},
                                                       })
                                                       .populate("courses")
                                                       .exec();
        //get topselling courses
        const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
        //return res
         return res.status(200).json({
            success:true,
            data:{
                selectedCatogery,
                diffrerntCategories,
            },
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