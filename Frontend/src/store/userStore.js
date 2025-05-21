import {create} from 'zustand'
import { axiosInstance } from '../../utils/axiosInstance.js'
import { toast } from 'react-toastify'
const userStore=create(set=>({
    loading:false,
    jobs:[],
    // user:null,
    appliedJobs:[],
    login:async({ email, password })=>{
        try {
            const response=await axiosInstance.post('/users/login',{
            email,password        
            })
            toast.success("Login SuccessFull")
            set({  loading: false });
             return { success: true };
        } catch (error) {
            const message = error?.response?.data?.message || 'Login failed';
            toast.error(message)
            set({loading:false})
            console.log(message)
        }
    },


    register:async({name,email,password})=>{
        try {
            const response=await axiosInstance.post('/users/register',{
            name,email,password        
            })
            toast.success("Login SuccessFull")
            set({loading:false})
            return{success:true}

        } catch (error) {
            const msg=error.response.data.message || "Registration Failed";
            set({loading:false})
            toast.error(msg)
        }
    },

     logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post('/users/logout');
      toast.success('Logged out successfully');
      set({ user: null, loading: false });
      return{success:true}

    } catch (error) {
      const message = error?.response?.data?.message || 'Logout failed';
      toast.error(message);
      set({ loading: false });
    }
  },    

  getJobs:async () => {
    // set({loading:true})
    try {
        const response=await axiosInstance.get('/users/getJobs')
        const jobs=response.data.jobs;
        set({jobs:jobs})
        
    } catch (error) {
        const msg=error.response.data.message;
        toast.error(msg);
        console.log(error)
    }
  },

  applyJob:async (jobId) => {
    try {
      const response=await axiosInstance.put('/users/applyJob',{
        jobId:jobId
      })
      toast.success(response.data.message)

      set({loading:false})

    } catch (error) {
       const msg=error.response.data.message;
        toast.error(msg);
        console.log(error)
    }
  },

  getAppliedJobs:async()=>{
    try {
        const response=await axiosInstance.get('/users/getAppliedJobs')
        

        set({loading:false,appliedJobs:response.data.appliedJobs})

    } catch (error) {
       const msg=error.response.data.message;
        toast.error(msg);
        console.log(error)
    }
  }

}))

export default userStore
