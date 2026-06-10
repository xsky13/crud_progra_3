import api from "@/api";
import type { User } from "@/types/User";
import type { AxiosError } from "axios";


export default async function loadUser(): Promise<{ user: User } | null> {
    try {
        const response = await api.get("/User/me");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
            if (axiosError.response?.status !== 401) {
                console.error("Unexpected error loading user:", axiosError);
            }
            return null;
    }
}
