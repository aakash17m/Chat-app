import User from "../models/user.model.js"
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    // res.send("signup route");
    const { email, fullname, password } = req.body;
    try {
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
        
    } catch (error) {
        
    }
}
export const login = (req, res) => {
    res.send("login route");
}
export const logout = (req, res) => {
    res.send("logout route");
}