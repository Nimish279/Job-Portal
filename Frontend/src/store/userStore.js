import { create } from 'zustand';
import { axiosInstance } from '../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import { getCookie } from '../utils/getCookie';

const useUserStore = create((set, get) => {
  const store = {
    loading: false,
    jobs: [],
    appliedJobs: [],
    user: null,
    fetchedUser: false,

    fetchUser: async () => {
  try {
    console.log('Calling /users/me...');
    const response = await axiosInstance.get('/users/me');
    const fetchedUser = response.data.user;
    console.log('Fetched user:', fetchedUser);
    set({ user: fetchedUser, fetchedUser: true });
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status !== 401 && status !== 403) {
      console.error('Unexpected error fetching user:', message);
    }

    
    set({ user: null, fetchedUser: true });
  }
},



    login: async ({ email, password }) => {
      set({ loading: true });
      try {
        const response = await axiosInstance.post('/users/login', { email, password });
        toast.success('Login Successful');
        set({ user: response.data.user, loading: false });
        return { success: true };
      } catch (error) {
        const message = error?.response?.data?.message || 'Login failed';
        toast.error(message);
        set({ loading: false });
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
        set({ jobs: response.data.jobs, loading: false });
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
        const response = await axiosInstance.put('/users/applyJob', { jobId });
        toast.success(response.data.message);
        set({ loading: false });
      } catch (error) {
        const msg = error?.response?.data?.message || 'Failed to apply';
        toast.error(msg);
      }
    },

    getAppliedJobs: async () => {
      try {
        const response = await axiosInstance.get('/users/getAppliedJobs');
        set({ appliedJobs: response.data.appliedJobs, loading: false });
      } catch (error) {
        const msg = error?.response?.data?.message || 'Failed to fetch applied jobs';
        toast.error(msg);
      }
    },
  };

  // ✅ Call fetchUser AFTER store has been created
  // setTimeout(() => {
  //   get().fetchUser();
  // }, 0);

  return store;
});

export default useUserStore;
