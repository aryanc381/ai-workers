import { Router } from "express";
import { z } from "zod";
import { validate } from "../../middleware/zodValidator.middleware.js";
import { login } from "../../services/auth.service.js";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.get("/login/health", async (req, res) => {
  return res.json({ status: 200, msg: "Login endpoint is up and healthy." });
});

router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    return res.json(result);
  } catch (err) {
    return res.json({ status: 500, msg: "Internal server error." });
  }
});

export default router;
