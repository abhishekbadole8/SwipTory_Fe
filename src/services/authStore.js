import { create } from "zustand";
import api from "./api";
import jwt_decode  from "jwt-decode";

// Create a Zustand store for authentication state
const useAuthStore = create((set) => ({
  // initial token value from local storage
  authToken: localStorage.getItem("authToken"),
  user: null,

  // function to authenticate user and update token
  login: async ({ username, password }) => {
    try {
      const response = await api.post("/api/user/login", {
        username,
        password,
      });

      //extract token from response
      const { authToken } = response.data;

      // save token to local storage and update state
      localStorage.setItem("authToken", authToken);
      set({ authToken });
    } catch (error) {
      throw new Error(
        error.response.data.error || "Failed to authenticate user"
      );
    }
  },

  // Function to register user
  register: async ({ username, password }) => {
    try {
      await api.post("/api/user/register", {
        username,
        password,
      });

      return true;
    } catch (error) {
      throw new Error(error.response.data.error || "Failed to register user");
    }
  },

  // function to decode
  setUserFromToken: (authToken) => {
    try {
      const decodedToken = jwt_decode(authToken);
      set({ user: decodedToken.user });
    } catch (error) {
      set({ user: null });
    }
  },

  // function to logout user
  logout: () => {
    // Clear token from local storage and state
    localStorage.removeItem("authToken");
    set({ authToken: null });
  },

  // function to check if user is authenticated
  isAuthenticated: () => {
    // check if token exists in zustand's state
    // !! return's boolean value
    return !!useAuthStore.getState().authToken;
  },

  getToken: () => {
    // Get token from state
    return useAuthStore.getState().authToken;
  },
}));

export default useAuthStore;
