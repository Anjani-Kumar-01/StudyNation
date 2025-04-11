const mongoose=require("mongoose");
const { type } = require("os");
const { stringify } = require("qs");

const userSchema = mongoose.Schema({
  firstName:{
    type: String,
    require:true,
    trim:true,
  },
  lastName:{
    type: String,
    require:true,
    trim:true,
},
email:{
  type:String,
  require:true,
},
 password:{
    type: String,
    require:true,

 },
 accountType:{
    type: String,
    enum:["Admin","student","instructor"],
    require:true,
 },
 additionalDetails:{
type:mongoose.Types.ObjectId,
require:true,
ref:"profile",
 },
 courses:{
    type:String,
    require:true,
 },
 image:{
type:String,
require:true
 },
 token:{
   type:String,
 },
 resetPasswordExpire:{
   type:Date,
 },
 courseProgress:[
    {
     type:mongoose.Types.ObjectId,
     ref:"courceProgress"
    }
 ]
    
 
});
module.exports = mongoose.model("User",userSchema);