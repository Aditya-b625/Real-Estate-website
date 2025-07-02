import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
      min: 6
    },
    contact: {
      type: Number,
      // required: true,
      unique: true,
      min: 10
    },
    profileImage:{
      type: String,
      required: false,
      default: ''
    },
    
    resetPasswordExpire: Date,
    resetPasswordOtp: Number
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);