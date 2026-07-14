import { Router } from "express";
import { buildGoogleAuthUrl } from "../../integrations/google/oauth.js";
import {
  getGoogleAccountStatus,
  linkGoogleAccount,
} from "../../services/google.service.js";

const googleAuthRouter = Router();

googleAuthRouter.get("/google/start", async (req, res) => {
  try {
    const userIdValue = req.query.userId;
    const phoneNumberValue = req.query.phoneNumber;

    if (typeof userIdValue !== "string" || typeof phoneNumberValue !== "string") {
      return res.json({
        status: 400,
        msg: "userId and phoneNumber are required.",
      });
    }

    const userId = Number(userIdValue);

    if (!Number.isInteger(userId) || userId <= 0 || !phoneNumberValue) {
      return res.json({
        status: 400,
        msg: "userId and phoneNumber are required.",
      });
    }

    // Keep state minimal so we can restore the right user on callback.
    const state = JSON.stringify({ userId, phoneNumber: phoneNumberValue });
    const authUrl = buildGoogleAuthUrl(state);

    return res.redirect(authUrl);
  } catch (err) {
    return res.json({
      status: 500,
      msg: "Failed to start Google OAuth.",
    });
  }
});

googleAuthRouter.get("/google/callback", async (req, res) => {
  try {
    const codeValue = req.query.code;
    const stateValue = req.query.state;

    if (typeof codeValue !== "string" || typeof stateValue !== "string") {
      return res.json({
        status: 400,
        msg: "code and state are required.",
      });
    }

    const parsedState = JSON.parse(stateValue) as {
      userId: number;
      phoneNumber: string;
    };

    const linkedAccount = await linkGoogleAccount(
      parsedState.userId,
      parsedState.phoneNumber,
      codeValue
    );

    return res.json({
      status: 200,
      msg: "Google account linked successfully.",
      data: linkedAccount,
    });
  } catch (err) {
    return res.json({
      status: 500,
      msg: "Failed to complete Google OAuth callback.",
    });
  }
});

googleAuthRouter.get("/google/status", async (req, res) => {
  try {
    const userIdValue = req.query.userId;

    if (typeof userIdValue !== "string") {
      return res.json({
        status: 400,
        msg: "userId is required.",
      });
    }

    const userId = Number(userIdValue);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.json({
        status: 400,
        msg: "userId is required.",
      });
    }

    const googleAccount = await getGoogleAccountStatus(userId);

    return res.json({
      status: 200,
      data: {
        linked: Boolean(googleAccount),
        googleAccount,
      },
    });
  } catch (err) {
    return res.json({
      status: 500,
      msg: "Failed to fetch Google link status.",
    });
  }
});

export default googleAuthRouter;
