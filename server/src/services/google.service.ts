import { prisma } from "../lib/prisma.js";
import {
  exchangeGoogleCode,
  fetchGoogleAccountIdentity,
} from "../integrations/google/oauth.js";

export async function linkGoogleAccount(userId: number, phoneNumber: string, code: string) {
  // Exchange the short-lived OAuth code for real Google tokens.
  const tokens = await exchangeGoogleCode(code);

  // Read the linked Google identity from the access token.
  const identity = await fetchGoogleAccountIdentity(tokens.access_token);

  const existingAccount = await prisma.googleAccount.findUnique({
    where: { userId },
  });

  const refreshToken = tokens.refresh_token ?? existingAccount?.refreshToken ?? "";

  // Convert expires_in seconds into a Date.
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  // Save or update the linked Google account for this user.
  const googleAccount = await prisma.googleAccount.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      phoneNumber,
      googleEmail: identity.googleEmail,
      googleSubjectId: identity.googleSubjectId,
      accessToken: tokens.access_token,
      refreshToken,
      expiresAt,
      scopes: tokens.scope,
    },
    update: {
      phoneNumber,
      googleEmail: identity.googleEmail,
      googleSubjectId: identity.googleSubjectId,
      accessToken: tokens.access_token,
      refreshToken,
      expiresAt,
      scopes: tokens.scope,
      status: "active",
    },
  });

  return googleAccount;
}

export async function getGoogleAccountStatus(userId: number) {
  return prisma.googleAccount.findUnique({
    where: {
      userId,
    },
  });
}
