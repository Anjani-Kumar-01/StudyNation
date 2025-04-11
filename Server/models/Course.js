const mongoose = require("mongoose");
const User = require("./User");
const Catogery = require("./Catogery");
const courseSchema = mongoose.Schema({
    courseName:{
    type: String,
    require:true,
    trim:true,
    },
    courseDescription:{
        type:String,
        require:true,


    },
    insctructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    whatYouWillLearn:{
        type:String,

    },
    courseContent:[
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:"Section"
        }

    ],
    price:{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    Catogery:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catogery",
    },
    tag:{
        type:String,
        require:true,
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    }]
       
    });

    module.exports = mongoose.model("couse",courseSchema);