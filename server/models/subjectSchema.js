import mongoose from "mongoose";

// Topic Schema
const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["video", "notes", "pyq", "assignment"], // restrict values
      required: true,
    },
    link: {
      type: String,
      required: true,
    },

    accessible: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true }
);

// Chapter Schema
const chapterSchema = new mongoose.Schema(
  {
    chapterName: {
      type: String,
      required: true,
    },
    topics: [topicSchema], // embedded topic schema
  },
  { timestamps: true }
);

// Subject Schema
const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      unique: true,
    },
    class: {
      type: String,
      required: true,
      enum: [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ],
    },
    title: {
      type: String,
    },
    thumbnailImage: {
      type: Buffer,
    },
    userId: {
      type: String,
    },
    chapters: [chapterSchema],
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
export const Chapter = mongoose.model("chapter", chapterSchema);
