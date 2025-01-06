import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import { connectDB } from './database/db.js';
dotenv.config();
const app = express();
const port = process.env.PORT||8000


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    return res.send("my server is running");
})

app.use('/api',userRoutes);

app.listen(port,()=>{
  console.log(`http://localhost:${port}`);
})



