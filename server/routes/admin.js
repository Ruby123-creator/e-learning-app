import express from "express";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { createCourse, createLecture, deleteCourse, deleteLecture, getAllStats } from "../controllers/admin.js";
import { uploadFiles } from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post('/admin/create_course',isAuth,isAdmin,uploadFiles,createCourse);
adminRouter.post('/admin/add_lecture/:id',isAuth,isAdmin,uploadFiles,createLecture);
adminRouter.delete('/admin/delete_lecture',isAuth,isAdmin, deleteLecture);
adminRouter.delete('/admin/delete_course',isAuth,isAdmin,deleteCourse);
adminRouter.get('/admin/getAllStats',isAuth,isAdmin,getAllStats);
export default adminRouter;
