import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import courseRouter from './routes/courses.js';
import adminRouter from './routes/admin.js';
import uploadRouter from './routes/upload.js'
import subjectRouter from './routes/subject.js'
import { connectDB } from './database/db.js';
import cors from 'cors';
import Razorpay from 'razorpay';
dotenv.config();
const app = express();  //Used to create the server and manage routes.
const port = process.env.PORT||8000

console.log(process.env.razor_pay_key, process.env.razor_secret_key,"CHECK::")
 export const instanace = new Razorpay({
  key_id: process.env.razor_pay_key,
  key_secret: process.env.razor_secret_key
})

app.use(express.json());//Parses incoming JSON payloads.
app.use(express.urlencoded({extended:true}));//Parses URL-encoded payloads. extended: true allows nested objects.
app.use(cors()); //Middleware that enables CORS (Cross-Origin Resource Sharing). This allows the server to handle requests from different origins.
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



