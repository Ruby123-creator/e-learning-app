import { getUploads, upload } from "../controllers/upload.js";

import express from 'express';

const router = express.Router();
router.post("/upload", upload);
router.get("/getUploads", getUploads);

export default router;