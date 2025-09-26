import express from "express";
import {  getAllChapters, getAllCourses } from "../controllers/courses.js";
import { isAuth } from "../middleware/isAuth.js";
const courseRouter = express.Router();

courseRouter.get("/course/getAllSubjects",getAllCourses);
courseRouter.get("/course/getAllChapters",getAllChapters);


// courseRouter.get("/course/courseById",getCourseById);
// courseRouter.get("/course/getAllLectures",isAuth,fetchCourseLectures);
// courseRouter.get("/course/LectureById", isAuth,fetchLectureById);
// courseRouter.get("/course/mycourse",isAuth,getMyCourses);
// courseRouter.post("/course/checkout",isAuth, checkout);
// courseRouter.post("/course/paymentVerification",isAuth,paymentVerification);
export default courseRouter;
