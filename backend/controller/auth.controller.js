import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
import { sendForgotMail } from "../middlewares/sendMail.js";

export const register = TryCatch(async (req, res) => {
  //console.log(req.body);
  const { email, name, password, contact} = req.body;
  let newUser = await User.findOne({ email });

  if (newUser)
    return res.status(400).json({
      message: "user with this email already exist",
    });

  const hashPassword = await bcrypt.hash(password, 10);
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  newUser = {
    name,
    email,
    password: hashPassword,
    contact,
    profileImage: imageUrl
  };

  // const otp = Math.floor(Math.random() * 1000000);
  const otp = Math.floor(Math.random() * 900000) + 100000;

  const activationToken = jwt.sign(
    {
      newUser,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "10m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "Asset Bazar account verification", data);

  res.status(200).json({
    message: "OTP sent to your mail",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify)
    return res.status(400).json({
      message: "OTP Expired",
    });

  if (verify.otp !== Number(otp))
    return res.status(400).json({
      message: "Wrong OTP",
    });

  await User.create({
    name: verify.newUser.name,
    email: verify.newUser.email,
    password: verify.newUser.password,
    contact: verify.newUser.contact,
    profileImage: verify.newUser.profileImage

  });

  res.json({
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser)
    return res.status(400).json({
      message: "No User with this email or Wrong credentials",
    });

  const matchPassword = await bcrypt.compare(password, existingUser.password);

  if (!matchPassword)
    return res.status(400).json({
      message: "Wrong Password",
    });

  const token = jwt.sign({ _id: existingUser._id,name: existingUser.name,email: existingUser.email }, process.env.Jwt_Sec, {
    expiresIn: "1d",
  });

  res.json({
    message: `Welcome back ${existingUser.name}`,
    token,
    existingUser,
  });
});

// export const myProfile = TryCatch(async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');o0
//   res.json({ user });
// });

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "No user with this email",
    });
  }

  // Generate numeric 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP and expiry time (5 minutes)
  user.resetPasswordOtp = otp;
  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  // Send OTP to user's email
  await sendForgotMail("Asset Bazar Password Reset OTP", { email, otp }); 

  res.json({
    message: "OTP has been sent to your email.",
  });
});

export const resetPassword = TryCatch(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "No user with this email",
    });
  }

  // Check OTP expiry
  if (!user.resetPasswordExpire || user.resetPasswordExpire < Date.now()) {
    return res.status(400).json({
      message: "OTP expired",
    });
  }

  // Direct numeric comparison (no bcrypt)
  if (user.resetPasswordOtp !== Number(otp)) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  // Hash and update new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  // Clear OTP and expiry
  user.resetPasswordOtp = null;
  user.resetPasswordExpire = null;

  await user.save();

  res.json({
    message: "Password has been reset successfully.",
  });
});


import admin from "../middlewares/firebaseAdmin.js";

export const googleLogin = TryCatch(async (req, res) => {
  const { token } = req.body;

  //Verify Firebase token
  const decodedToken = await admin.auth().verifyIdToken(token);
  const { email, name, picture, uid: googleId } = decodedToken;
  //Find or create user
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      googleId,
      picture,
      password: "googleuser",
    });
  }

  //Generate app JWT
  const authToken = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });

  res.status(200).json({
    message: `Welcome ${user.name}`,
    token: authToken,
    user,
  });
});