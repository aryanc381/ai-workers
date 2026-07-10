import api from "./axiosInstance";

export async function signup(input: { email: string; password: string; fullName: string }) {
  const { data } = await api.post("/auth/signup", input);
  return data as { status: number; msg: string };
}

export async function login(input: { email: string; password: string }) {
  const { data } = await api.post("/auth/login", input);
  return data as { status: number; msg: string; userId?: string };
}
