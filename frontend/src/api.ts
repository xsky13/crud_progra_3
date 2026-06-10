import { AxiosError } from "axios";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5125/api",
    withCredentials: true
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        for (const [, value] of config.data.entries()) {
            if (value instanceof File && value.size > 100 * 1024 * 1024) {
                const error = new AxiosError("El archivo es demasiado grande. Maximo 100MB.");
                (error as any).isClientError = true;
                return Promise.reject(error);
            }
        }
    }
    return config;
});

export default api;
