const { Mongoose, default: mongoose } = require("mongoose");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
//template ko vi import karanga


//capture payment and initiate razorpay
exports.capturePayment = async(req,res)=>{
    //get courseid and userid
    const {course_id} = req.body;
    const userId = req.user.id;
    //validate data
    if(!course_id){
        return res.json({
            success:false,
            message:"alll fields are required"
        })
    }
  
    // valid course details
    let course ;
    try{
        course = await course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:"could not find the course"
            });
        }
     //user alrady exist or not
     const uid = new mongoose.Types.ObjectId(userId);
     if(course.studentsEnrolled.includes(uid)){
        return res.status(200).json({
            success:false,
            message:"student is alrady enrolled",
        });
     }
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"something went wrong",
    });
}
    //crate order
    const amount = course.price;
    const currency = "INR";

    const option ={
        amount:amount*100,
        currency,
        recipt:Math.random(Date.now().toString()),
        notes:{
            courseId:course_id,
            userId,
        }
    };

    try{

        //initiate paymenmt
        const paymentResponse = await instance.orders.create(option);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    }catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:'something went wrong'
        });
     }
};

//verify singnature of razorpay and server
exports.verifySignature = async (req,res)=>{
    const webhookSecret = "123456";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256",webhookSecret);
    const digest = shasum.digest("hex");
    if(signature === digest){
        console.log("payment is authorized");

        const {courseId,userId} = req.body.payload.payment.entity.notes;

        try{
            //fulfill the action
            //find thee course and enroll the student
            const enrolledCourse = await Course.findByIdAndUpdate(
                                                                 {_id:courseId},
                                                                 {$push:{studentsEnrolled:userId}},
                                                                 {new:true},
            );
            if(!enrolledCourse){
                return res.status(500).json({
                    success:true,
                    message:"couse not found"
                });
            }
            console.log(enrolledCourse);
            const enrolledStudent = await User.findByIdAndUpdate(
                                                                 {_id:userId},
                                                                 {$push:{Course:courseId}},
                                                                 {new:true},
                                                                  );
             console.log(enrolledStudent);

             //mailsend krdo confirmation ka
             const emailResponse = await mailSender(
                                                enrolledStudent.email,
                                                "congratulation from codehelp",
                                                "congeatulation, you are enrolled into new codehelp course"
             );
                    console.log(emailResponse);
                    return res.status(200).json({
                        success:true,
                        message:"signature verified and course added"
                    });
            }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:true,
                message:error.message,
            });  
       
        }
}
else{
     return res.status(400).json({
        success:false,
        message:"invalid request"
     })
}
};
