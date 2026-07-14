import { Router } from "express";
import signupRouter from "./auth/signup.route.js";
import loginRouter from "./auth/login.route.js";
import chatRouter from "./chat/chat.route.js";

const router = Router();

router.use("/auth", signupRouter, loginRouter);
router.use("/backend", chatRouter);

export default router;
