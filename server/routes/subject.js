import express from 'express';
import { addChapters, addSubject, addTopics } from '../controllers/subject.js';
import { uploadFiles } from '../middleware/multer.js';

const router = express.Router();


router.post("/addSubject", uploadFiles("thumbnailImage"), addSubject);
router.post("/addChapters", addChapters);
router.post("/addTopics", addTopics);



export default router;