import { TryCatch } from "../middleware/tryCatch.js"

import { Subject } from "../models/subjectSchema.js";
export const getAllCourses = TryCatch(async (req, res) => {
  const { userId } = req.query; // if you're passing as query param

  const allCourses = await Subject.find({ userId });

  res.json({
    success: true,
    allCourses,
  });
});



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



