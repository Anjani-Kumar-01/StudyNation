const { error } = require("console");
const mongoose = require("mongoose");
require("dotenv").config();
 
exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=>console.log("db connected sucessfully"))
    .catch((error)=>{
        console.log("DB connection failed");
        console.error(error);
        process.exit(1);
    })
}
