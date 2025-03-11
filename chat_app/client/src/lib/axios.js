import axios from 'axios'
 // https://chat-app-7wb6.onrender.com/api
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})