import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpiredAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  resendOtp: {
    type: String,
    default: "",
  },
  resendOtpExpiredAt: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
