import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URL;

export const connectDB =   mongoose.connect(url).then(()=>{
    console.log('databse connected successfully');
}).catch((err)=>{
    console.log(err,"there is connection issue")
})


