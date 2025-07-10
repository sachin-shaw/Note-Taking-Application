import express from 'express';
import { signup, verifyOTP, resendOTP, login, googleAuth } from '../controllers/authController';
import { signupValidation, loginValidation, validateRequest } from '../middleware/validation';

const router = express.Router();

router.post('/signup', signupValidation, validateRequest, signup);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginValidation, validateRequest, login);
router.post('/google', googleAuth);

export default router;