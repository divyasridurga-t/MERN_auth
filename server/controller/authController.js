import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      status: "failed",
      message: "field missing",
    });
  }
  try {
    let existingUser = userModel.user.findOne({ email });
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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: error.message,
    });
  }
};

export const login = () => {};
