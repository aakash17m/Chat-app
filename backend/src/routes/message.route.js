import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.comtroller.js";

const router = express.Router();

router.get("/User", protectRoute, getUsersForSidebar);

export default router;