import axios from "axios"

const apiBase = (import.meta.env.VITE_API_URL || "https://subscription-tracker-eight-beige.vercel.app") + "/api/v1";

const API = axios.create({
  baseURL: apiBase,
});

// Attach JWT token automatically from localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
