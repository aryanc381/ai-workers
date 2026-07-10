import { Router } from "express";
import signupRouter from "./auth/signup.route.js";
import loginRouter from "./auth/login.route.js";

const router = Router();

router.use("/auth", signupRouter, loginRouter);

export default router;
