import api from "@/api";
import type { AxiosError } from "axios";
import { redirect } from "react-router";

// loader para rutas que no se pueden acceder despues de login
export default async function authCheckLoader(): Promise<void | Response> {
    try {
        await api.get("/User/me");
        return redirect("/")
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status !== 401) console.error("Unexpected error loading user:", axiosError);
    }
}
