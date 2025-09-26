import express from 'express';
import { addChapters, addSubject, addTopics } from '../controllers/subject.js';


const router = express.Router();


router.post("/addSubject", addSubject);
router.post("/addChapters", addChapters);
router.post("/addTopics", addTopics);



export default router;