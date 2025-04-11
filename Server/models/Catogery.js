const mongoose= require("mongoose");

const catogerySchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    course:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
],
});

module.exports = mongoose.model("Tag",catogerySchema);