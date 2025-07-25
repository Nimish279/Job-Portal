import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000/api',  // 👈 Ensure this matches your backend's base URL
  baseURL: 'https://job-portal-backend-swtv.onrender.com/api',  // ✅ Render backend URL
  withCredentials: true,                 // 👈 Enables sending cookies (used for sessions/auth)
  headers: {
    'Content-Type': 'application/json',  // 👈 Default content type for requests
    // You can add more headers here if needed (like Authorization)
  },
});
