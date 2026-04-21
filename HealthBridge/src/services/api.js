import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Attach token automatically
API.interceptors.request.use(
  (req) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ❗ GLOBAL ERROR HANDLING (BEST PRACTICE 🔥)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    // अगर token expire / unauthorized
    if (err.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/"; // login page redirect
    }

    return Promise.reject(err);
  }
);



export default API;