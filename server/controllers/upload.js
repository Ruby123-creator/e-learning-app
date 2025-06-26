import { TryCatch } from "../middleware/tryCatch.js";
import { UploadSchema } from "../models/uploadSchema.js";

export const upload = TryCatch(async (req, res) => {
  const { uploadType, subtype, uploadLink, className, subject, isPublic } = req.body;

  const newUpload = await UploadSchema.create({
    uploadType,
    subtype,
    uploadLink,     
    className,     
    subject,
    isPublic,
  });

  res.status(201).json({
    success: true,
    message: "Upload created successfully",
    data: newUpload,
  });
});


export const getUploads = TryCatch(async (req, res) => {
  const { subject, className } = req.query;

  const filter = {};
  if (subject) filter.subject = subject;
  if (className) filter.className = className;

  const uploads = await UploadSchema.find(filter);

  res.status(200).json({
    success: true,
    count: uploads.length,
    data: uploads,
  });
});
