import axios from "axios";
import useAuthStore from "../store/authStore";

// Base URL of the backend API
const baseURL = `https://swiptory.up.railway.app`;

const api = axios.create({
  baseURL,
});

// Adding a request interceptor to include the authentication token in request headers
api.interceptors.request.use((config) => {
  // Get authentication token from Zustand store
  const authToken = useAuthStore.getState().authToken;

  // Include the token in request headers if it exists
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default api;