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

  return prisma.$transaction(async (tx) => {
    const existingByUser = await tx.googleAccount.findUnique({
      where: { userId },
    });

    const existingBySubject = await tx.googleAccount.findUnique({
      where: { googleSubjectId: identity.googleSubjectId },
    });

    const refreshToken = tokens.refresh_token ?? existingByUser?.refreshToken ?? existingBySubject?.refreshToken ?? "";

    // Convert expires_in seconds into a Date.
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    // If the same Google account is already linked elsewhere, move it to this user.
    if (existingBySubject && existingBySubject.userId !== userId) {
      if (existingByUser && existingByUser.id !== existingBySubject.id) {
        await tx.googleAccount.delete({
          where: { userId },
        });
      }

      return tx.googleAccount.update({
        where: {
          googleSubjectId: identity.googleSubjectId,
        },
        data: {
          userId,
          phoneNumber,
          googleEmail: identity.googleEmail,
          accessToken: tokens.access_token,
          refreshToken,
          expiresAt,
          scopes: tokens.scope,
          status: "active",
        },
      });
    }

    // Save or update the linked Google account for this user.
    if (existingByUser) {
      return tx.googleAccount.update({
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
      });
    }

    return tx.googleAccount.create({
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
  });
}

export async function getGoogleAccountStatus(userId: number) {
  return prisma.googleAccount.findUnique({
    where: {
      userId,
    },
  });
}
