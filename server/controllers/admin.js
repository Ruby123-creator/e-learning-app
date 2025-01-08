import { TryCatch } from "../middleware/tryCatch.js";
import { CourseSchema } from "../models/courseSchema.js";
import { LectureSchema } from "../models/lectureSchema.js";
import fs from 'fs';
import {rm} from 'fs';
import { promisify } from "util";
import { UserSchema } from "../models/userSchema.js";
import { totalmem } from "os";

export const createCourse = TryCatch(async (req,res)=>{
    const {title, description , price, duration, category} = req.body;
    if (!req.file) {
        return res.status(400).send({
            status: 400,
            message: 'Thumbnail image is required',
        });
    }
    const { path: thumbnailPath } = req.file; // Extract file path

    await CourseSchema.create({
     title,
     description,
     price,
     duration,
     category,
     thumbnailImage:thumbnailPath
    })

    res.send({
        status:200,
        message:'Course created Successfully'
    })
})




export const createLecture = TryCatch(async (req,res)=>{
const course = await CourseSchema.findById(req.params.id);

if(!course){
    return res.send({
        status: 400,
        message:"No course is found"
    })
}

const {title, description} = req.body;
if (!req.file) {
    return res.status(400).send({
        status: 400,
        message: 'video lecture is required',
    });
}
const { path: videoPath } = req.file; // Extract file path

  const lecture = await LectureSchema.create({
    title,
    description,
    video: videoPath,
    course: course._id,
  })
    
   

    res.send({
        status:200,
        message:'Lecture created Successfully',
         data: lecture,
    })
})

export const deleteLecture = TryCatch(async (req,res)=>{
    const lecture = await LectureSchema.findById(req.query.id);

    rm(lecture.video,()=>{
        console.log("video deleted successfully");
    })

    await lecture.deleteOne();

    res.send({
        status:200,
        message:'lecture deleted successfully'
    })
})


const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async (req,res)=>{
    const course = await CourseSchema.findById(req.query.id);

    const allLectures = await LectureSchema.find({course: course._id});

    await Promise.all(
        allLectures.map(async(lecture)=>{
          await unlinkAsync(lecture.video);
          console.log('video deleted successfully');
        })
    )

    rm(course.thumbnailImage,()=>{
        console.log("image deleted successfully");
    })

    await LectureSchema.find({course: req.params.id}).deleteMany();

    await CourseSchema.deleteOne();

    await UserSchema.updateMany({}, { $pull: { subscription: req.params.id } });

    res.send({
        status:200,
        message:"Course Deleted Successfully"
    })
})



export const getAllStats = TryCatch(async (req,res)=>{
    const totalUsers = (await UserSchema.find()).length;
    const totalCourse = (await CourseSchema.find()).length;
    const totalLectures = (await LectureSchema.find()).length;

    const stats = {
        totalUsers,
        totalLectures,
        totalCourse
    }

    res.json({
        stats,
    })
})