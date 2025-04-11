const mongoose=require("mongoose");
const { type } = require("os");
const { title } = require("process");
const Subsection = require("./Subsection");


const SectionSchema = mongoose.Schema({
 
sectionName:{
    type:String,
},
Subsection:[
    {
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"subsection"
    }
],
    
 
});
module.exports = mongoose.model("Section",SectionSchema);