import api from "@/api";
import type { AxiosError } from "axios";
import { redirect } from "react-router";

export default async function authProtectedLoader(): Promise<void | Response> {
    try {
        await api.get("/User/me");
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status !== 401) {
            console.error("Unexpected error loading user:", axiosError);
        }
        return redirect("/")
    }
}
