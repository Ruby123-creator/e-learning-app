
import { TryCatch } from "../middleware/tryCatch.js";
import { Subject } from "../models/subjectSchema.js";

export const addSubject = TryCatch(async (req, res) => {
    const {subjectName} = req.body;

    const newSubject = await Subject.create({
        subjectName
    })

    res.status(201).json({
    success: true,
    message: "Subject added successfully",
    data: newSubject,
  });
})

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subjects",
      error: error.message,
    });
  }
};