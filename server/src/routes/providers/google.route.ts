import { Router } from "express";
import { buildGoogleAuthUrl } from "../../integrations/google/oauth.js";
import { env } from "../../env.js";
import { getGoogleAccountStatus, linkGoogleAccount } from "../../services/google.service.js";

const router = Router();

router.get("/google/start", async (req, res) => {
  try {
    const phoneNumberValue = req.query.phoneNumber?.toString().trim();

    if (!phoneNumberValue) {
      return res.json({ status: 400, msg: "phoneNumber is required." });
    }

    // Keep the phone number in state so the callback can finish linking.
    const state = JSON.stringify({ phoneNumber: phoneNumberValue });
    const authUrl = buildGoogleAuthUrl(state);

    return res.redirect(authUrl);
  } catch (err) {
    return res.json({ status: 500, msg: "Failed to start Google OAuth." });
  }
});

router.get("/google/callback", async (req, res) => {
  try {
    const codeValue = req.query.code?.toString();
    const stateValue = req.query.state?.toString();

    if (!codeValue || !stateValue) {
      return res.json({ status: 400, msg: "code and state are required." });
    }

    const parsedState = JSON.parse(stateValue) as { phoneNumber: string };
    const userId = req.user?.userId;

    if (!userId) {
      return res.json({ status: 401, msg: "Unauthorized." });
    }

    await linkGoogleAccount(userId, parsedState.phoneNumber, codeValue);

    return res.redirect(`${env.FRONTEND_URL}/dashboard/plugin?google=linked`);
  } catch (err) {
    console.error("Google OAuth callback failed:", err);
    return res.redirect(`${env.FRONTEND_URL}/dashboard/plugin?google=failed`);
  }
});

router.get("/google/status", async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.json({ status: 401, msg: "Unauthorized." });
    }

    const googleAccount = await getGoogleAccountStatus(userId);

    return res.json({ status: 200, data: { linked: Boolean(googleAccount), googleAccount } });
  } catch (err) {
    return res.json({ status: 500, msg: "Failed to fetch Google link status." });
  }
});

export default router;
