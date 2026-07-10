import { Router } from "express";
import { z } from "zod";
import { validate } from "../../middleware/zodValidator.middleware.js";
import { signup } from "../../services/auth.service.js";

const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
});

router.get("/signup/health", async (req, res) => {
  return res.json({ status: 200, msg: "Signup endpoint is up and healthy." });
});

router.post("/signup", validate(signupSchema), async (req, res) => {
  try {
    const { email, password, fullName } = req.body as z.infer<typeof signupSchema>;
    const result = await signup({ email, password, fullName });
    return res.json(result);
  } catch (err) {
    return res.json({ status: 500, msg: "Internal server error." });
  }
});

export default router;
