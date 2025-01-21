import express from 'express';
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, verifyResetOtp } from '../controller/authController.js';
import userMidAuth from '../middleware/userAuth.js';
let router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verify-otp', userMidAuth, sendVerifyOtp);
router.post('/verify-email', userMidAuth, verifyEmail);
router.post('/is-auth', userMidAuth, isAuthenticated);
router.post('/send-reset-otp', sendResetOtp);
router.post('/verify-reset-otp', verifyResetOtp);



export default router;