import { TryCatch } from "../middleware/tryCatch.js"

import { Subject } from "../models/subjectSchema.js";
export const getAllCourses = TryCatch(async (req, res) => {
  const { userId, subjectId, class: classId } = req.query;

  // Build filter dynamically
  const filter = {};
  if (userId) filter.userId = userId;
  if (subjectId) filter._id = subjectId;  // assuming subjectId refers to MongoDB _id
 
  if (classId) filter.class = classId;

  const allCourses = await Subject.find(filter);

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



