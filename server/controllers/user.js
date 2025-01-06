import { UserSchema } from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import sendMail from "../middleware/sendMail.js";
import dotenv from 'dotenv';
import { TryCatch } from "../middleware/tryCatch.js";
dotenv.config();
export const register = TryCatch(async (req,res)=>{

    const {email,username,password} = req.body;
         let userEmailExists = await UserSchema.findOne({email});
         let userNameExists = await UserSchema.findOne({username});
         if(userEmailExists){
            return res.send({
                status:400,
                message:"Email is already exist",
            })
         }
         if(userNameExists){
            return res.send({
                status:400,
                message:"Username is already exist",
            })
         }
         const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.SALT)
          );
         const user ={
            username,
            email,
            password: hashedPassword
         }
         console.log(user ,"CHECK::::::::::")
         const otp = Math.floor(Math.random()*1000000);
          const activationToken = jwt.sign({
            user,
            otp,

          },process.env.WEBTOKENKEY, {expiresIn:'5m'});
          console.log(user,otp,activationToken ,"CHECK::::::::::")

          const data = {
            username,
            otp
          }

          await sendMail(email, "E LEARNING", data)
        
        return res.send({
            status: 200,
            message: "Otp send to the email",
            activationToken
          })
   
})


export const verifyUser = TryCatch(async (req,res)=>{
   const {otp, activationToken} = req.body;

   const verify = jwt.verify(activationToken , process.env.WEBTOKENKEY);

   if(!verify){
    res.send({
        status: 400,
        message:"OTP Expired"
    })
   }
  console.log(verify,otp ,"HOME")
   if(parseInt(verify.otp) !== parseInt(otp)){
    res.send({
        status: 400,
        message:"Incorrect Otp"
    })
   }

    await UserSchema.create({
        username: verify?.user?.username,
        email: verify?.user?.email,
        password: verify?.user?.password,
    })

    res.json({
        message: "User Registered",
      });
})


export const loginUser = TryCatch(async (req,res)=>{
    const {loginId,password} = req.body;

     let user;
    if(validator.isEmail(loginId)){
        user = await UserSchema.findOne({email: loginId})

    }
    else{
        user = await UserSchema.findOne({username:loginId})
    }

    if(!user){
        return res.send({
            status:400,
            message:"Invalid LoginId, No user Exist"
        })
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if(!matchedPassword){
        return res.send({
            status:400,
            message:"Incorrect Password"
        })
    }

    const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
        expiresIn: "15d",
      });
    
      res.json({
        message: `Welcome back ${user.username}`,
        token,
        user,
      });

})


export const myProfile = TryCatch(async (req,res)=>{
    const user = await UserSchema.findById(req.user._id);

  res.json({ user });
})