import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controller/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)

router.route("/update-profile").put(protectedRoute ,updateProfile)

router.route("/check-auth").get(protectedRoute, checkAuth)

export default router;