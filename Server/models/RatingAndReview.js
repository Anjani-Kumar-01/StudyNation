const { default: mongoose, mongo, Mongoose } = require("mongoose");
const User = require("./User");
const { request } = require("express");

// const mongoose = require(mongoose);

const ratingAndReviewSchema = mongoose.Schema({
    User:{
     type:mongoose.Schema.Types.ObjectId,
    },
    rating:{
        type:Number,
        require:true,
    },
    review:{
    type:String,
    require:true

    },
    

});
module.exports =mongoose.model("RatingAndReview",ratingAndReviewSchema)