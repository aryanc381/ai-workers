import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.msg || "Something went wrong";
    return Promise.reject(new Error(msg));
  }
);

export default api;
