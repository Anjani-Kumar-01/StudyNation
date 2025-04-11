const mongoose = require("mongoose");
const { type } = require("os");

const courceProgress=  mongoose.Schema({
    couseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subsection"
    }
})