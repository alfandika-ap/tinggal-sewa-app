import TokenService from "@/services/token-service";
import type { AxiosError } from "axios";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error("VITE_API_URL is not defined in environment variables");
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Log the error for debugging
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });

    if (error.response?.status === 401) {
      // Unauthorized - token might be invalid or expired
      TokenService.removeToken();
    }
    return Promise.reject(error);
  }
);

// Add request interceptor to add authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = axiosInstance;

export default api;
