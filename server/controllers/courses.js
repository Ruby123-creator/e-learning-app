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


export const getAllChapters = TryCatch(async (req, res) => {
  const { subjectId } = req.query;

  const subject = await Subject.findById(subjectId);

  if (!subject) {
    return res.status(404).json({
      success: false,
      message: "No subject found with this id",
    });
  }

  res.json({
    success: true,
    subjectName: subject.subjectName,
    chapters: subject.chapters, // return only chapters
  });
});



