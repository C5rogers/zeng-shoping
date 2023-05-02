import axios from "axios";

export const API_URL = "http://localhost:8000/api/"

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('ZENG_SHOPING_AUTH_TOKEN')}`
    return config;
})

export default $api;