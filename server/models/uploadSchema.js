import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    uploadType: {
      type: String,
      required: true,
      enum: ["video", "notes"],
    },
    subtype: {
      type: String,
      required: true,
    },
     topic: {
      type: String,
      required: true,
    },
    uploadLink:{
        type: String,
        required: true
    },
    className: {
      type: String,
      enum: ["UPSC",
        "Current Affairs",
        "Other Competitive Exams","VI", "VII", "VIII", "IX", "X", "XI", "XII"],
    },
    subject: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const UploadSchema = mongoose.model("Upload", uploadSchema)
