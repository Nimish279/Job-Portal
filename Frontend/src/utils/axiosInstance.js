// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000/api',  // 👈 Ensure this matches your backend's base URL
//   withCredentials: true,                 // 👈 Enables sending cookies (used for sessions/auth)
//   headers: {
//     'Content-Type': 'application/json',  // 👈 Default content type for requests
//     // You can add more headers here if needed (like Authorization)
//   },
// });

import axios from "axios";

export const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8000/api", // 👈 Match your backend base URL
  withCredentials: true,
=======
  baseURL: 'http://localhost:8000/api',  // 👈 Ensure this matches your backend's base URL
  // baseURL: 'https://job-portal-backend-swtv.onrender.com/api',  // ✅ Render backend URL
  withCredentials: true,                 // 👈 Enables sending cookies (used for sessions/auth)
>>>>>>> d8a7f4b6c610f19ed7b4fef6d6cf38d1cfa668f9
  headers: {
    "Content-Type": "application/json",
  },
});
<<<<<<< HEAD

// ✅ Add request interceptor to inject token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    // const recruiter = JSON.parse(localStorage.getItem("recruiter"));
    // if (recruiter?.token) {
    //   config.headers.Authorization = `Bearer ${recruiter.token}`;
    // }
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
=======
 
>>>>>>> d8a7f4b6c610f19ed7b4fef6d6cf38d1cfa668f9
