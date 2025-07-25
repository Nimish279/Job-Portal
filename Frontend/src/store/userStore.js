import { create } from 'zustand';
import { axiosInstance } from '../utils/axiosInstance.js';
import { toast } from 'react-toastify';

const userStore = create((set) => ({
  loading: false,
  jobs: [],
  appliedJobs: [],
  user: JSON.parse(localStorage.getItem('user')) || null, // 🔥 load from localStorage
  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/users/login', { email, password });

      toast.success('Login Successful');

      // const defaultUser = {
      //   email,
      //   name: email.split('@')[0],
      // };

      // localStorage.setItem('user', JSON.stringify(defaultUser)); // ✅ Save to localStorage

      // set({ user: defaultUser, loading: false });
      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed';
      toast.error(message);
      set({ loading: false });
      console.log(message);
      return { success: false };
    }
  },

  register: async ({ name, email, password }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/users/register', {
        name,
        email,
        password,
      });
      toast.success('Registration Successful');
      set({ loading: false });
      return { success: true };
    } catch (error) {
      const msg = error?.response?.data?.message || 'Registration Failed';
      set({ loading: false });
      toast.error(msg);
      return { success: false };
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post('/users/logout');
      set({ user: null, loading: false });
      toast.success('Logged out successfully');
      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.message || 'Logout failed';
      toast.error(message);
      set({ loading: false });
      return { success: false };
    }
  },

  getJobs: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/users/getJobs');
      const jobs = response.data.jobs;
      set({ jobs, loading: false });
      return { success: true };
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to fetch jobs';
      toast.error(msg);
      set({ jobs: [], loading: false });
      return { success: false, error: msg };
    }
  },

  applyJob: async (jobId) => {
    try {
      const response = await axiosInstance.put('/users/applyJob', {
        jobId,
      });
      toast.success(response.data.message);
      set({ loading: false });
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to apply';
      toast.error(msg);
      console.log(error);
    }
  },

  getAppliedJobs: async () => {
    try {
      console.log('ad')
      const response = await axiosInstance.get('/users/getAppliedJobs');
      console.log(response.data.appliedJobs)
      set({ appliedJobs: response.data.appliedJobs, loading: false });
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to fetch applied jobs';
      toast.error(msg);
      console.log(error);
    }
  },
}));

export default userStore;
