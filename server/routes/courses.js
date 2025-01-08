import express from "express";
import { checkout, fetchCourseLectures, fetchLectureById, getAllCourses, getCourseById, getMyCourses, paymentVerification } from "../controllers/courses.js";
import { isAuth } from "../middleware/isAuth.js";
const courseRouter = express.Router();

courseRouter.get("/course/getAllCourse",getAllCourses);
courseRouter.get("/course/courseById",getCourseById);
courseRouter.get("/course/getAllLectures",isAuth,fetchCourseLectures);
courseRouter.get("/course/LectureById", isAuth,fetchLectureById);
courseRouter.get("/course/mycourse",isAuth,getMyCourses);
courseRouter.post("/course/checkout",isAuth, checkout);
courseRouter.post("/course/paymentVerification",isAuth,paymentVerification);
export default courseRouter;
