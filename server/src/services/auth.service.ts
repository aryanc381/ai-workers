import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { env } from "../env.js";

export async function signup(input: { email: string; password: string; fullName: string }) {
  const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
  if (existingUser) return { status: 409, msg: `User ${input.fullName} is already present in database.` };

  const hashedPassword = await bcrypt.hash(input.password, Number(env.BCRYPT_SALT));
  const newUser = await prisma.user.create({
    data: { email: input.email, password: hashedPassword, fullName: input.fullName, user_type: "user" },
  });

  return { status: 200, msg: `User ${newUser.fullName} added in database.` };
}

export async function login(input: { email: string; password: string }) {
  const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
  if (!existingUser) return { status: 409, msg: `User ${input.email} does not exist.` };

  const auth = await bcrypt.compare(input.password, existingUser.password);
  if (!auth) return { status: 401, msg: `Invalid credentials for ${existingUser.email}.` };

  return { status: 200, msg: "Login successful.", userId: existingUser.id };
}
