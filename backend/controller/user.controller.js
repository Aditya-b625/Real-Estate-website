import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import TryCatch from '../middlewares/TryCatch.js';

export const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) throw new Error("No such user found");
    res.json({ user });
});

export const updateUser = TryCatch(async(req,res)=>{
    console.log(req.body);
    let {name,password,contact} = req.body;
    if (req.params.id === req.user.id.toString()) {
            if (password) {
               const newPassword = await bcrypt.hash(password, 10)
               req.body.password = newPassword
            }
            if (req.file) {
                req.body.profileImage = `/uploads/${req.file.filename}`;// You can customize path
            }
            if (req.body.email) {
                delete req.body.email;
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.status(200).json({message:"User details updated successfully",updatedUser});
    } else {
        return res.status(403).json({ msg: 'You can update only your profile' })
    }
});

export const deleteUser = TryCatch(async(req,res)=>{
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'Account deleted successfully' }); 
});


