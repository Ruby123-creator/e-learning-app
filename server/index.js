import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import courseRouter from './routes/courses.js';
import adminRouter from './routes/admin.js';
import { connectDB } from './database/db.js';
import cors from 'cors';
import Razorpay from 'razorpay';
dotenv.config();
const app = express();
const port = process.env.PORT||8000

console.log(process.env.razor_pay_key, process.env.razor_secret_key,"CHECK::")
 export const instanace = new Razorpay({
  key_id: process.env.razor_pay_key,
  key_secret: process.env.razor_secret_key
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.get('/',(req,res)=>{
    return res.send("my server is running");
})

app.use('/api',userRoutes);
app.use('/api',courseRouter);
app.use('/api', adminRouter);

app.listen(port,()=>{
  console.log(`http://localhost:${port}`);
})



