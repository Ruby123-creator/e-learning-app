import express from 'express';
import { loginUser, register, verifyUser } from '../controllers/user.js';



const router = express.Router();

router.post('/user/register',register);
router.post('/user/verifyuser',verifyUser);
router.post('/user/loginuser',loginUser);


export default router;