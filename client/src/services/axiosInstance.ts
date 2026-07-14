import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

function requireApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is missing.");
  }

  return API_BASE_URL;
}

const api = axios.create({
  baseURL: `${requireApiBaseUrl()}/api/v1`,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.msg || "Something went wrong";
    return Promise.reject(new Error(msg));
  }
);

export default api;
