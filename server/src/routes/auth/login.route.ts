import { Router } from "express";
import { z } from "zod";
import { validate } from "../../middleware/zodValidator.middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { getClearAuthCookieOptions, getAuthCookieOptions } from "../../lib/jwt.js";
import { getCurrentUser, login, logout } from "../../services/auth.service.js";

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
    if (result.status !== 200) {
      return res.json(result);
    }

    res.cookie("token", result.token, getAuthCookieOptions());
    return res.json({ status: result.status, msg: result.msg, user: result.user });
  } catch (err) {
    return res.json({ status: 500, msg: "Internal server error." });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.json({ status: 401, msg: "Unauthorized." });
    }

    const user = await getCurrentUser(userId);

    if (!user) {
      return res.json({ status: 401, msg: "Unauthorized." });
    }

    return res.json({ status: 200, user });
  } catch (err) {
    return res.json({ status: 500, msg: "Internal server error." });
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
  if (req.user?.userId) {
    await logout(req.user.userId);
  }

  res.clearCookie("token", getClearAuthCookieOptions());
  return res.json({ status: 200, msg: "Logged out successfully." });
});

export default router;
