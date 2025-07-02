import express from "express";
import {forgotPassword,loginUser,register,resetPassword,verifyUser,googleLogin} from "../controller/auth.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/register",upload.single('profileImage'),register);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
//router.get("/me", isAuth, myProfile);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);
router.post("/user/google-login", googleLogin);

export default router;