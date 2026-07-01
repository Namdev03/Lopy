import axios from 'axios';
 export const axiosInstance = axios.create({
    baseURL:"https://lopy-4tkd.onrender.com",
    withCredentials:true
})