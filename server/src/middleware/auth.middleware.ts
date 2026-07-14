import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { verifyAuthToken, type AuthTokenPayload } from "../lib/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    return res.json({ status: 401, msg: "Unauthorized." });
  }

  try {
    const payload = verifyAuthToken(token);
    const user = await prisma.user.findFirst({
      where: {
        id: payload.userId,
        token,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    });

    if (!user) {
      return res.json({ status: 401, msg: "Unauthorized." });
    }

    req.user = {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    return next();
  } catch (err) {
    return res.json({ status: 401, msg: "Unauthorized." });
  }
}
