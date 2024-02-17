import axios from "axios";

const token = localStorage.getItem('token');

axios.defaults.withCredentials = true;

export default axios.create({
    // baseURL: "http://localhost:4430/api",
    baseURL: "https://socialmedia-backend-cw3l.onrender.com/api",
    timeout: 5000,
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
})

export const formDataAxios = axios.create({
    // baseURL: "http://localhost:4430/api",
    baseURL: "https://socialmedia-backend-cw3l.onrender.com/api",
    timeout: 5000,
    headers: {
        "content-type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
    }
})