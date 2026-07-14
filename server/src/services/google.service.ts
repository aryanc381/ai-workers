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

  const existingByUser = await prisma.googleAccount.findUnique({
    where: { userId },
  });

  const existingBySubject = await prisma.googleAccount.findUnique({
    where: { googleSubjectId: identity.googleSubjectId },
  });

  if (existingBySubject && existingBySubject.userId !== userId) {
    throw new Error("This Google account is already linked to another user.");
  }

  const refreshToken = tokens.refresh_token ?? existingByUser?.refreshToken ?? existingBySubject?.refreshToken ?? "";

  // Convert expires_in seconds into a Date.
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  // Save or update the linked Google account for this user.
  const googleAccount = existingByUser
    ? await prisma.googleAccount.update({
        where: {
          userId,
        },
        data: {
          phoneNumber,
          googleEmail: identity.googleEmail,
          googleSubjectId: identity.googleSubjectId,
          accessToken: tokens.access_token,
          refreshToken,
          expiresAt,
          scopes: tokens.scope,
          status: "active",
        },
      })
    : await prisma.googleAccount.create({
        data: {
          userId,
          phoneNumber,
          googleEmail: identity.googleEmail,
          googleSubjectId: identity.googleSubjectId,
          accessToken: tokens.access_token,
          refreshToken,
          expiresAt,
          scopes: tokens.scope,
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
