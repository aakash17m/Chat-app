import {    generateTokens } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';
import cloudinary from "../lib/cloudinary"

export const signup = async (req, res) => {
    // res.send("signup route");
    const { email, fullname, password } = req.body;
    try {

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: `Please fill in all fields` });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: `Password must be at least 8 characters` });
        }
        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({message: `Email already exixts`});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPass
        })

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                createdAt: newUser.profilepic
            });
        } else{
            res.status(400).json({message: `Invalid user data`});
        }
        
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}
export const login = async(req, res) => {
    const { email, password} = req.body
    try {
        const user = await user.findOne({email})
        
        if(!user){
            return res.status(400).json({message:"invalid credentials"});
        }

        const isPassorrect = await bcrypt.compare(password, user.password);
        if (!isPassorrect) {
            return res.status(400).json({message:"invalid credentials"});

        }
        
        generateTokens(user._id,res)

        res.status(200).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            createdAt: newUser.profilepic,
        });
        
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({message:"Internal Server Error"});

    }
}
export const logout = (req, res) => {
    // res.send("logout route");
    try {
        res.cookie("jwt", "", {maxAge: 0 });
        res.status(200).json({message:"Logged Out Successfully"});

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

}

export const updateProfile = async (req, res) => {
    
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile Pic is required" });

        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilepic:uploadResponse.secure_url}, {new:true})

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in update profile", error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);        
    } catch (error) {
        console.log("Error in CheckAuth controller", error.message);
        res.status(500).json({message: "internal server error"});
    }
}