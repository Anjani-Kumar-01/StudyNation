const mongoose=require("mongoose");
const { type } = require("os");
const { stringify } = require("qs");

const ProfileSchema =  mongoose.Schema({

       gender:{
        type:String,
       },
       dateOfBirth:{
        type:String,
       },
       about:{
        type:String,
        trim:true,
       },
       contactnumber:{
        type:Number,
        trim:true,
       }
    
 
});
module.exports = mongoose.model("Profile",ProfileSchema);