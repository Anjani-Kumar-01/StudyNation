const JWT = require('jsonwebtoken');
require("dotenv").config();
const user = require("../models/User");
//auth

exports.Auth = async(req,res,next)=>{
    try{
        //extract token
        const token = req.cookies.token 
                       ||req.cookies.token 
                      || req.header("authorisation ").replace("Bearer","");
            // if token is missing
            if(!token){
                return res.status(401).json({
                    success:false,
                    message:"Token is missing",
                });
            }
            try{
                const decode =  JWT.verify(token,process.env.JWT_SECRET);
                console.log(decode);
                req.user = decode;
            }
            catch(err){
                //verification - issue
                return res.status(401).json({
                    success:false,
                    message:'token is invalid'
                });

            }

        next();
    }catch(error){
         return res.status(401).json({
            success:false,
            message:'somthing went wrong',
         })
    }
}

//isstudent
exports.isStudent = async(req,res,next)=>{
  try{
  if(req.user.accountType!=="student"){
    return res.status(401).json({
        success:false,
        message:"this is a protected route for students only"
    })
    next();
  }
  }catch(error){
    return res.status(500).json({
        success:false,
        message:"user request cannot get verified"
    })
  }
}


//isinstructor
exports.isInsructor = async(req,res,next)=>{
    try{
    if(req.user.accountType!=="instructor"){
      return res.status(401).json({
          success:false,
          message:"this is a protected route for instructor only"
      })
      next();
    }
    }catch(error){
      return res.status(500).json({
          success:false,
          message:"user request cannot get verified"
      })
    }
  }
  

//isAdmin
exports.isAdmin = async(req,res,next)=>{
    try{
    if(req.user.accountType!=="admin"){
      return res.status(401).json({
          success:false,
          message:"this is a protected route for admin only"
      })
      next();
    }
    }catch(error){
      return res.status(500).json({
          success:false,
          message:"user request cannot get verified"
      })
    }
  }
  