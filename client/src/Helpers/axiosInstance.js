import axios from "axios";

// import { config } from "dotenv";
// config()

const base_url = 'https://lms-production-ready-3.onrender.com/api/v1'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = base_url;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
