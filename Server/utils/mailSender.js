const nodemailer = require("nodemailer");
const User = require("../models/User");
const mailSender = async(email,title,body)=>{
    try{
           let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                User:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
           })
           let info = await transporter.sendMail({
            from:"studyNation",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
           })
           console.log(info);
           return info;
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;