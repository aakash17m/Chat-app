import { User } from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) =>{
    try{
        const loggedInUserId = req.user.id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
    }
}