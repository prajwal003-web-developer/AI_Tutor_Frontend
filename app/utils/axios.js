import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // your JWT key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export default api;
