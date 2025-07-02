import express from 'express';
import { deleteUser, updateUser, myProfile} from "../controller/user.controller.js";
import { isAuth } from '../middlewares/isAuth.js';
import upload from "../middlewares/upload.js";

const router = express.Router();

router.put('/:id',isAuth,upload.single('profileImage'),updateUser);
router.delete('/delete',isAuth,deleteUser);
router.get("/me", isAuth, myProfile);


export default router;
