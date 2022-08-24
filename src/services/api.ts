import axios from "axios";

const api = axios.create({
  baseURL: "https://bingo-g5-ploomes.onrender.com",
});

api.interceptors.request.use((config: any) => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: any) {
    console.log(error);
  }
});

export default api;
