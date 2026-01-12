import express from "express";
import {
    register,
    login,
    me,
    logout,
    forgotPassword,
    resetPassword
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, me);
router.post("/logout", logout);

/* 🔐 Password Recovery */
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
