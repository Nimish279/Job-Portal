import axios from 'axios';

const backend_url = import.meta.env.VITE_BACKEND_URL
export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000/api',  // 👈 Ensure this matches your backend's base URL
  // baseURL: 'https://job-portal-backend-swtv.onrender.com/api', // ✅ Render backend URL
  baseURL: backend_url,  
  withCredentials: true,                 // 👈 Enables sending cookies (used for sessions/auth)
  headers: {
    'Content-Type': 'application/json',  // 👈 Default content type for requests
    // You can add more headers here if needed (like Authorization)
  },
});
 