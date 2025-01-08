import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userSchema.js";
import dotenv from 'dotenv';
dotenv.config();
export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token)
      return res.status(403).json({
        message: "Please Login",
      });

    const decodedData = jwt.verify(token, process.env.Jwt_Sec);

    req.user = await UserSchema.findById(decodedData._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};


export const isAdmin = async (req,res, next)=>{
  try {
     if(req.user.role !== 'Admin'){
       return res.send({
          status:403,
          message:'user is not admin'
        })
     }
     next();
  } catch (error) {
      return res.send({
      status:500,
      message:error.message
    })
  }
}