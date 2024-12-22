import axios from "axios";

// import { config } from "dotenv";
// config()

const base_url = 'http://localhost:5014/api/v1'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = base_url;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;