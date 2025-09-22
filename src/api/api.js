import axios from "axios"

const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5500") + "/api/v1";

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