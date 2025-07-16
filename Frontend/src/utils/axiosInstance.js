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
  baseURL: "http://localhost:8000/api", // 👈 Match your backend base URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

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
