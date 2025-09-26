
import { TryCatch } from "../middleware/tryCatch.js";
import { Chapter, Subject } from "../models/subjectSchema.js";

export const addSubject = TryCatch(async (req, res) => {
    const {subjectName,class:userClass,title, thumbnailImage,userId } = req.body;

    const newSubject = await Subject.create({
        subjectName,
        class:userClass,
        title,
        thumbnailImage,
        userId,
    })

    res.status(201).json({
    success: true,
    message: "Subject added successfully",
    data: newSubject,
  });
})

export const addChapters = TryCatch(async (req, res) => {
  const { id, chapterName } = req.query; // you can also use req.body if sending via POST

  // Find the subject by id
  const subject = await Subject.findById(id);

  if (!subject) {
    return res.status(404).json({
      message: "No subject with this id",
    });
  }

  // Push a new chapter
  subject.chapters.push({ chapterName });

  // Save updated subject
  await subject.save();

  res.json({
    message: `Chapter "${chapterName}" added successfully`,
    subject,
  });
});


export const addTopics = TryCatch(async (req, res) => {
  const { subjectId,chapterId,title,type,link,accessible  } = req.body; // you can also use req.body if sending via POST

  // Find the subject by id
   const subject = await Subject.findById(subjectId);

  if (!subject) {
    return res.status(404).json({
      message: "No subject with this id",
    });
  }

  // Find chapter within subject
  const chapter = subject.chapters.id(chapterId);

  if (!chapter) {
    return res.status(404).json({
      message: "No chapter with this id",
    });
  }

 
   const newTopic ={
    title,
    type,
    link,
    accessible
   }
  // Push a new chapter
  chapter.topics.push(newTopic);

  // Save parent subject (important!)
  await subject.save();

  res.json({
    message: `Topic "${title}" added successfully to chapter "${chapter.chapterName}"`,
    chapter,
  });
});

