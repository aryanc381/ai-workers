import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const formattedErrors = parsed.error.issues.map((e) => ({ path: e.path[0], msg: e.message }));
      res.json({ status: 403, msg: "Invalid request body.", error: formattedErrors });
      return;
    }
    req.body = parsed.data;
    next();
  };
}
