const mongoose=require("mongoose");
const { type } = require("os");
const { title } = require("process");


const subsectioneSchema =  mongoose.Schema({
 
    title:{
        type:String,
    },
    timeDuration:{
  type:String,
    },
    videoUrl:{
        type:String, 
    }

    
 
});
module.exports = mongoose.model("subsection",subsectioneSchema);