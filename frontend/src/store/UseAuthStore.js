import { create } from "zustand";
// import { express } from "express";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("http://localhost:5001/api/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try{
      const res = await axiosInstance.post("http://localhost:5001/api/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");

    }catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  // login: async (data) => {}
}));
