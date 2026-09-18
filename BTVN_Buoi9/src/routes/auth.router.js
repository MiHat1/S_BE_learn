import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middeware.js";
const router = express.Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

export const authRouter = router;

