import axios from "axios";
import { useCookies } from '@vueuse/integrations/useCookies'

const instance = axios.create({
    baseURL: "https://api.freeapi.app/api/v1",
})

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use((config) => {
    const cookies = useCookies();
    const token = cookies.get("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance