import { TryCatch } from "../middleware/tryCatch.js"
import { CourseSchema } from "../models/courseSchema.js"
import { LectureSchema } from "../models/lectureSchema.js";
import { UserSchema } from "../models/userSchema.js";
import { instanace } from "../index.js";
import crypto from 'crypto';
import { PaymentSchema } from "../models/paymentSchema.js";
import { Subject } from "../models/subjectSchema.js";
export const getAllCourses = TryCatch(async (req,res)=>{
   const allCourses = await Subject.find();

   res.json({
    allCourses,
   })
})


