import { Router } from "express";
import signupRouter from "./auth/signup.route.js";
import loginRouter from "./auth/login.route.js";
import chatRouter from "./chat/chat.route.js";
import googleAuthRouter from "./providers/google.route.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use("/auth", signupRouter, loginRouter);
router.use(authMiddleware);
router.use("/backend/chat", chatRouter);
router.use("/providers", googleAuthRouter);

export default router;
