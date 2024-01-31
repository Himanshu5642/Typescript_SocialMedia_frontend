import axios from "axios";

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: "http://localhost:4430/api",
    timeout: 1000,
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
})

export const formDataAxios = axios.create({
    baseURL: "http://localhost:4430/api",
    timeout: 1000,
    headers: {
        "content-type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
    }
})