import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;