import {    generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    // res.send("signup route");
    const { email, fullname, password } = req.body;
    try {

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: `Please fill in all fields` });
        }
        if (password.length < 7) {
            return res.status(400).json({ message: `Password must be at least 7 characters` });
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
export const login = (req, res) => {
    res.send("login route");
}
export const logout = (req, res) => {
    res.send("logout route");
}