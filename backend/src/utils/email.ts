import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // ✅ Must match app password user
    pass: process.env.EMAIL_PASS  // ✅ Must be valid app password
  }
});

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for HD Notes App',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">HD Notes App</h2>
        <p>Your OTP for email verification is:</p>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="color: #4F46E5; font-size: 32px; margin: 0;">${otp}</h1>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p style="color: #666;">If you didn't request this OTP, please ignore this email.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
