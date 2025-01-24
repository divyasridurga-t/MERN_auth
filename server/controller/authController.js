import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import transporter from "../config/nodemailer.js";
dotenv.config();


export const register = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      status: "failed",
      message: "field missing",
    });
  }
  try {
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        status: "failed",
        message: "user already exists!",
      });
    }
    // bcrypt password
    let hashedPassword = await bcrypt.hash(password, 10);
    // create user in DB
    let user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // genrate token and send them in cookies
    let token = jwt.sign({ id: user._id }, process.env.JWT_SCRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    let mailOptions = {
      from: 'sridivya8143@gmail.com',
      to: email,
      subject: 'Welcome to MERN Auth',
      text: `Welcome ${name}! Your account is been successully created with ${email} account`
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(`error===${err}`)
      }
    });
    return res.json({ success: true, message: 'user created successfully' })
  } catch (error) {
    console.log(error.message);

    return res.json({
      status: "failed",
      message: error.message,
    });
  }
};


export const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: 'false', message: 'email and password is missing' })
  }
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid email' })
    }
    let passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.json({ success: false, message: 'Invalid password' })
    }
    let token = jwt.sign({ id: user._id }, process.env.JWT_SCRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true })
  } catch (error) {
    return res.json({
      status: "failed",
      message: error.message,
    });
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    return res.json({ success: true })
  } catch (error) {
    return res.json({
      status: "failed",
      message: error.message,
    });
  }
}


export const sendVerifyOtp = async (req, res) => {
  let { userId } = req.body;
  try {
    let userDetails = await userModel.findById(userId);
    if (userDetails.isAccountVerified) {
      return res.json({ status: 'failed', message: 'user email is already verified' })
    }
    let otp = String(Math.floor(10000 + Math.random() * 90000));
    userDetails.verifyOtp = otp;
    userDetails.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
    await userDetails.save();
    let mailOptions = {
      from: 'sridivya8143@gmail.com',
      to: userDetails.email,
      subject: 'OTP Verification - MERN Auth',
      text: `OTP for verifying email- ${otp}`
    }
    transporter.sendMail(mailOptions)
    res.json({ status: 'success', message: 'otp sent to your registered email id.' })
  } catch (error) {
    console.log(error, '????');

    return res.json({
      status: 'failed',
      message: error.message
    })
  }
}

export const verifyEmail = async (req, res) => {
  let { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({
      status: false,
      message: 'missing details'
    })
  }

  try {
    let userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res.json({
        status: false,
        message: 'user not found'
      })
    }
    if (userDetails.verifyOtp === '' || userDetails.verifyOtp !== otp) {
      return res.json({
        status: false,
        message: 'invalid otp'
      })
    }
    if (Date.now() > userDetails.verifyOtpExpiredAt) {
      return res.json({
        status: false,
        message: 'otp expired'
      })
    }

    userDetails.isAccountVerified = true;
    userDetails.verifyOtp = ''
    userDetails.verifyOtpExpiredAt = 0;
    await userDetails.save();
    return res.json({ status: true, message: 'email verified successfully' })
  } catch (error) {
    return res.json({
      status: false,
      message: error.message
    })
  }
}

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: 'user logged in' })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const sendResetOtp = async (req, res) => {
  let { email } = req.body;
  if (!email) {
    return res.json({ status: false, message: 'email not found' })
  }
  try {
    let userDetails = await userModel.findOne({ email });
    let otp = String(Math.floor(10000 + Math.random() * 90000));
    userDetails.resendOtp = otp;
    userDetails.resendOtpExpiredAt = Date.now() + 60 * 60 * 1000;
    await userDetails.save();
    let mailOptions = {
      from: 'sridivya8143@gmail.com',
      to: email,
      subject: 'OTP for reset password - MERN Auth',
      text: `OTP for resetting your password is- ${otp}`
    }
    transporter.sendMail(mailOptions);
    return res.json({ success: true, message: 'otp sent to your registered email id.' })
  } catch (error) {
    return res.json({
      status: false,
      message: error.message
    })
  }
}


export const verifyResetOtp = async (req, res) => {
  let { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({ status: false, message: 'missing credentials' })
  }
  try {
    let userDetails = await userModel.findOne({ email });
    if (!userDetails) {
      return res.json({ status: false, message: 'invalid emailId' })
    }

    if (userDetails.resendOtp == '' || userDetails.resendOtp !== otp) {
      return res.json({
        status: false, message: 'invalid otp'
      })
    }
    if (Date.now() > userDetails.resendOtpExpiredAt) {
      return res.json({
        status: false, message: 'otp expired'
      })
    }
    let hashedPassword = await bcrypt.hash(newPassword, 10);
    userDetails.password = hashedPassword;
    userDetails.resendOtp = '';
    userDetails.resendOtpExpiredAt = 0;
    await userDetails.save();

    return res.json({ status: true, message: 'password changed successfully' })

  } catch (error) {
    console.log(error.message);
    return res.json({
      status: false,
      message: error.message
    })
  }
}

