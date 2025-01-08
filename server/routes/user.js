import express from 'express';
import { loginUser, myProfile, register, verifyUser } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';



const router = express.Router();

router.post('/user/register',register);
router.post('/user/verifyuser',verifyUser);
router.post('/user/loginuser',loginUser);
router.get('/user/myAccount',isAuth,myProfile)


export default router;