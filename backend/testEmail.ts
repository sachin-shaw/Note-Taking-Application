import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'your-own-email@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email from Nodemailer'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) return console.error('Email failed:', error);
  console.log('Email sent:', info.response);
});
