import express from 'express';
import { addSubject, getAllSubjects } from '../controllers/subject.js';


const router = express.Router();


router.post("/addSubject", addSubject);
router.get("/getAllSubjects", getAllSubjects); 

export default router;