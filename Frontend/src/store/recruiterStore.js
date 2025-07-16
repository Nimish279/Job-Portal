import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance"; // ✅ fixed path
import { toast } from "react-toastify";

const recruiterStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("recruiter")) || null,

  loading: false,

  // login: async ({ email, password }) => {
  //   try {
  //     const response = await axiosInstance.post("/recruiters/login", {
  //       email,
  //       password,
  //     });
  //     set({ loading: false });
  //     toast.success("Login Successfull");
  //     return { success: true };
  //   } catch (error) {
  //     const msg = error.response.data.message;
  //     toast.error(msg);
  //     set({ loading: false });
  //   }
  // },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const recruiterResponse = await axiosInstance.post("/recruiters/login", {
        email,
        password,
      });

      toast.success("Login Successful");

      const token = recruiterResponse.data.token;

      const defaultRecruiter = {
        email,
        name: email.split("@")[0],
        token,
      };

      const userResponse = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      const defaultUser = {
        email,
        name: email.split("@")[0],
        token: userResponse.data.token,
      };

      localStorage.setItem("user", JSON.stringify(defaultUser));
      set({ user: defaultUser });

      localStorage.setItem("recruiter", JSON.stringify(defaultRecruiter));
      set({ user: defaultRecruiter, loading: false });

      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Login Failed";
      toast.error(msg);
      set({ loading: false });
      return { success: false };
    }
  },

  register: async (formData) => {
    set({ loading: true });
    try {
      const form = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          form.append(key, formData[key]);
        }
      }
      const response = await axiosInstance.post("/recruiters/register", form);
      toast.success("Recruiter registered successfully");
      set({ loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      const msg = error.response.data.message;
      toast.error(msg);
    }
  },

  // logout: async () => {
  //   try {
  //     const response = await axiosInstance.post("/recruiters/logout");
  //     return { success: false };
  //   } catch (error) {
  //     set({ loading: false });
  //     const msg = error.response.data.message;
  //     toast.error(msg);
  //   }
  // },

  logout: async () => {
    try {
      await axiosInstance.post("/recruiters/logout");
      localStorage.removeItem("recruiter"); // ✅ clear token
      set({ user: null, loading: false });
      toast.success("Logout Successful");
      return { success: true };
    } catch (error) {
      set({ loading: false });
      const msg = error.response.data.message;
      toast.error(msg);
      return { success: false };
    }
  },

  postJob: async (jobData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post("/recruiters/postJob", jobData);
      set({ loading: false });
      toast.success("Job posted successfully!");
      return { success: true };
    } catch (error) {
      set({ loading: false });
      const msg = error.response?.data?.message || "Failed to post job";
      toast.error(msg);
      return { success: false };
    }
  },
}));

export default recruiterStore;
