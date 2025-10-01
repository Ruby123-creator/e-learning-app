import { UserSchema } from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import  {sendMail, sendForgotMail, sendEnquiryMail } from "../middleware/sendMail.js";
import dotenv from 'dotenv';
import { TryCatch } from "../middleware/tryCatch.js";
dotenv.config();


export const register = TryCatch(async (req, res) => {
  const { email, username, password, phone, class: userClass,isAdmin,status } = req.body;

  const userEmailExists = await UserSchema.findOne({ email });
  const userNameExists = await UserSchema.findOne({ username });
  const userPhoneExists = await UserSchema.findOne({ phone });

  if (userEmailExists) return res.status(400).json({ message: "Email already exists" });
  if (userNameExists) return res.status(400).json({ message: "Username already exists" });
  if (userPhoneExists) return res.status(400).json({ message: "Phone number already exists" });

  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

  const user = {
    username,
    email,
    password: hashedPassword,
    phone,
    class: userClass,
    isAdmin,
    status
  };

  const otp = Math.floor(100000 + Math.random() * 900000); 

  const activationToken = jwt.sign({ user, otp }, process.env.WEBTOKENKEY, { expiresIn: '5m' });

  const mailData = { username, otp };
  await sendMail(email, "Topicwise Institute Verification", mailData);

  return res.status(200).json({
    message: "OTP sent to email successfully",
    activationToken,
  });
});




export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  if (!otp || !activationToken) {
    return res.status(400).json({ message: "OTP and token are required" });
  }

  let verifiedToken;
  try {
    verifiedToken = jwt.verify(activationToken, process.env.WEBTOKENKEY);
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  if (parseInt(verifiedToken.otp) !== parseInt(otp)) {
    return res.status(400).json({ message: "Incorrect OTP" });
  }

  const userExists = await UserSchema.findOne({ email: verifiedToken.user.email });
  if (userExists) {
    return res.status(400).json({ message: "User already registered with this email." });
  }

  const newUser = await UserSchema.create({
    username: verifiedToken.user.username,
    email: verifiedToken.user.email,
    password: verifiedToken.user.password,
    phone: verifiedToken.user.phone,
    class: verifiedToken.user.class,
    isAdmin: verifiedToken.user.isAdmin,
  });

  return res.status(201).json({
    message: "User registered successfully.",
    userId: newUser._id,
  });
});



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


export const getAllUsers = TryCatch(async (req, res) => {
  const users = await UserSchema.find();
  res.status(200).json(users);
});


export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;
  console.log(req.body, "Rubyyyyyy");

  const user = await UserSchema.findOne({ email }); // use findOne

  if (!user) {
    return res.status(404).json({
      message: "No User with this email",
    });
  }

  // Generate a JWT that expires in 5 minutes
  const token = jwt.sign(
    { email },
    process.env.Forgot_Secret,
    { expiresIn: "5m" }
  );

  // Save token expiry in DB
  user.resetPasswordToken = token;
user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
await user.save();



  // Send mail with reset link
  const data = { email, token };
  console.log(data, "Checkkkkk");
  await sendForgotMail("E learning", data);

  res.json({
    message: "Reset Password Link has been sent to your email",
  });
});


export const resetPassword = TryCatch(async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Decode token
    const decodedData = jwt.verify(token, process.env.Forgot_Secret);

    // Find user
    const user = await UserSchema.findOne({ 
      email: decodedData.email, 
      resetPasswordToken: token 
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Check expiry
    if (!user.resetPasswordExpire || user.resetPasswordExpire < Date.now()) {
      return res.status(400).json({ message: "Token Expired" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    res.json({ message: "Password Reset Successful" });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: "Error resetting password", 
      error: err.message 
    });
  }
});







export const updateStatus = TryCatch(async (req, res) => {
    const user = await UserSchema.findById(req.query.id);


  if (!user)
    return res.status(404).json({
      message: "No user with this id",
    });





  user.status = req.query.status;


  await user.save();

  res.json({ message: `User ${req.query.status} successfully` });
});



export const sendEnquiry = TryCatch(async (req, res) => {
   const {name,email,phoneNumber,class:studentClass,message} = req.body; 
    
  

   const mailData = {name,email,phoneNumber,class:studentClass,message};
await sendEnquiryMail("New Student Enquiry - Topicwise Institute", mailData);

  return res.status(200).json({
    message: "Enquiry sent successfully",
  });
});



