import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../env.js";

export type AuthTokenPayload = {
  userId: number;
  email: string;
  fullName: string;
};

const cookieMaxAge = 7 * 24 * 60 * 60 * 1000;

function requireJwtEnv() {
  if (!env.JWT_SECRET || !env.JWT_EXPIRES_IN) {
    throw new Error("JWT env variables are missing.");
  }

  return {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  };
}

export function signAuthToken(payload: AuthTokenPayload) {
  const { secret, expiresIn } = requireJwtEnv();
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
}

export function verifyAuthToken(token: string) {
  const { secret } = requireJwtEnv();
  return jwt.verify(token, secret) as AuthTokenPayload;
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: cookieMaxAge,
  };
}

export function getClearAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}
