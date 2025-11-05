import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import courseRouter from './routes/courses.js';
import adminRouter from './routes/admin.js';
import uploadRouter from './routes/upload.js'
import subjectRouter from './routes/subject.js'
import { connectDB } from './database/db.js';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';


dotenv.config();
const allowedOrigins = [
  "https://topicwise.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow mobile/postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ CORS blocked for:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Must add this for preflight requests
app.options("*", cors());
const app = express();  //Used to create the server and manage routes.
const port = process.env.PORT||8000
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));



app.use(express.json());//Parses incoming JSON payloads.
app.use(express.urlencoded({extended:true}));//Parses URL-encoded payloads. extended: true allows nested objects.


app.use('/uploads',express.static('uploads'));//Serves static files from the uploads directory when requested via /uploads.
app.get('/',(req,res)=>{
    return res.send("my server is running");
})
// These are separate route handlers that organize endpoints related to users, courses, and admins.
app.use('/api',userRoutes);
app.use('/api',courseRouter);
app.use('/api', adminRouter);
app.use('/api', uploadRouter);
app.use('/api', subjectRouter);

app.listen(port,()=>{
  console.log(`http://localhost:${port}`);
})



