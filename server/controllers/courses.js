import { TryCatch } from "../middleware/tryCatch.js"
import { CourseSchema } from "../models/courseSchema.js"
import { LectureSchema } from "../models/lectureSchema.js";
import { UserSchema } from "../models/userSchema.js";
import { instanace } from "../index.js";
import crypto from 'crypto';
import { PaymentSchema } from "../models/paymentSchema.js";
export const getAllCourses = TryCatch(async (req,res)=>{
   const allCourses = await CourseSchema.find();

   res.json({
    allCourses,
   })
})


export const getCourseById = TryCatch(async (req,res)=>{
    const course = await CourseSchema.findById(req.query?.id);

    res.json({
        course,
    })
})


export const fetchCourseLectures = TryCatch(async (req,res)=>{
    const courseLectures = await LectureSchema.find({course:req.query.id});
    console.log(req,"FETCH:::::")
    if(!courseLectures){
        return res.send({
            status:400,
            message:'Invalid course Id'
        })
    }
    else{
        const user = await UserSchema.findById(req.user._id);

        if(user.role === 'Admin'){
            return res.json({lecture:courseLectures});
        }
        else{
            if(!user.subscription.includes(req.query.id)){
                return res.send({
                    status:403,
                    message:"course is not subscribed",
                })
            }

            return res.json({
                lecture:courseLectures
            })
        }
    }
})


export const fetchLectureById = TryCatch(async (req,res)=>{
    const courseLectures = await LectureSchema.findById(req.query.id);
    console.log(req,"FETCH:::::")
    if(!courseLectures){
        return res.send({
            status:400,
            message:'Invalid Id'
        })
    }
    else{
        const user = await UserSchema.findById(req.user._id);

        if(user.role === 'Admin'){
            return res.json({lecture:courseLectures});
        }
        else{
            if(!user.subscription.includes(req.query.id)){
                return res.send({
                    status:403,
                    message:"course is not subscribed",
                })
            }

            return res.json({
                lecture:courseLectures
            })
        }
    }
})

export const getMyCourses = TryCatch(async (req,res)=>{
    const subscribedCourses = await CourseSchema.find({_id: req.user.subscription});

    req.json({
      subscribedCourses,  
    })
})

export const checkout = TryCatch(async (req, res) => {
    const user = await UserSchema.findById(req.user._id);
  
    const course = await CourseSchema.findById(req.params.id);
  
    if (user.subscription.includes(course._id)) {
      return res.status(400).json({
        message: "You already have this course",
      });
    }
  
    const options = {
      amount: Number(course.price * 100),
      currency: "INR",
    };
  
    const order = await instanace.orders.create(options);
  
    res.status(201).json({
      order,
      course,
    });
  });




  export const paymentVerification = TryCatch(async (req,res)=>{

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    const body = razorpay_order_id+ "|"+razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.Razorpay_key_secret).update(body).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
           await PaymentSchema.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
           })

           const user = await UserSchema.findById(req.user._id);

           const course = await CourseSchema.findById(req.query.id);

           user.subscription.push(course._id);

           await user.save();

           res.send({
            status:200,
            message:"Course purchased Successfully"
           })
    }
    else{
        res.send({
            status:400,
            message:"Payment Failed"
        })
    }

  })