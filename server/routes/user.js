import express from 'express';
import { loginUser, myProfile, register, verifyUser, getAllUsers, forgotPassword, resetPassword, updateStatus, sendEnquiry } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';
const router = express.Router();

router.post('/user/register',register);
router.post('/user/verifyuser',verifyUser);
router.post('/user/loginuser',loginUser);
router.get('/user/myAccount',isAuth,myProfile);
router.get('/user/getAllUsers', getAllUsers);
router.post('/user/forgetPassword', forgotPassword);
router.post('/user/resetPassword', resetPassword);

router.post('/user/updateStatus', updateStatus);
router.post('/user/enquiries', sendEnquiry);


export default router;