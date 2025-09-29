
import multer from "multer";
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
        const uniqueId = uuid();
        const extName = file.originalname.split('.').pop();
        const fileName = `${uniqueId}.${extName}`
        cb(null, fileName);
    }
  })
  
// multer.js
export const uploadFiles = (fieldName) => multer({ storage }).single(fieldName);
