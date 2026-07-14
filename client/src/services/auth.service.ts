import api from "./axiosInstance";

export async function signup(input: { email: string; password: string; fullName: string }) {
  const { data } = await api.post("/auth/signup", input);
  return data as { status: number; msg: string };
}

export async function login(input: { email: string; password: string }) {
  const { data } = await api.post("/auth/login", input);
  return data as {
    status: number;
    msg: string;
    user?: { id: number; email: string; fullName: string };
  };
}

export async function getSession() {
  const { data } = await api.get("/auth/me");
  return data as {
    status: number;
    user: { id: number; email: string; fullName: string };
  };
}

export async function logout() {
  const { data } = await api.post("/auth/logout");
  return data as { status: number; msg: string };
}
