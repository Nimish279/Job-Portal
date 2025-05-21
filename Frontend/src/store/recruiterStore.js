import { create } from "zustand";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify"; 

const recruiterStore=create(set=>({
    loading:false,

    login:async ({email,password}) => {
        try {
            const response=await axiosInstance.post('/recruiters/login',{
                email,password
            })
            set({loading:false})
            toast.success("Login Successfull")
            return{success:true}
        } catch (error) {
            const msg=error.response.data.message;
            toast.error(msg);
            set({loading:false})
        }
    },
    register:async (formData) => {
        set({loading:true})
        try {
            const form=new FormData()
            for (const key in formData) {
                if (formData[key]) {
                   form.append(key,formData[key])   
                }
            }
    const response = await axiosInstance.post('/recruiters/register', form);
      toast.success("Recruiter registered successfully");
      set({ loading: false });
      return { success: true };


        } catch (error) {
              set({loading:false})
            const msg=error.response.data.message
            toast(msg)
        }
    },

    logout:async () => {
        try {
            const response=await axiosInstance.post('/recruiters/logout')
            
            return{success:false}
        } catch (error) {
            set({loading:false})
            const msg=error.response.data.message
            toast(msg)
        }
    }
}))

export default recruiterStore