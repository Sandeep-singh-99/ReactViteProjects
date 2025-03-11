import express from 'express';
import { getMessage, getUsersForSideBar, sendMessage, uploadMiddleware } from '../controller/message.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.route("/users").get(protectedRoute ,getUsersForSideBar)
router.route("/chat-message/:id").get(protectedRoute, getMessage)

router.route("/send/:id").post(protectedRoute, uploadMiddleware, sendMessage)

export default router;