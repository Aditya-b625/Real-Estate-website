import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;     //authorization

    if (!token)
      return res.status(403).json({
        message: "Please Login",
      });

    const decodedData = jwt.verify(token, process.env.Jwt_Sec);

    req.user = await User.findById(decodedData._id);
    // req.user = decodedData;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};