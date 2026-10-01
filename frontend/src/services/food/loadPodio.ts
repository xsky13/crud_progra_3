import { redirect, type LoaderFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import { isAxiosError } from "axios";

export default async function loadPodio({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const order = url.searchParams.get("order") ?? "desc";

    try {
        await api.get("/User/me");
        const response = await api.get(`/Comida/byPromedio?order=${order}`);
        return response.data;
    } catch (err) {
        if (isAxiosError(err) && err.status == 401) return redirect("/login");
        return manageRequestError(err);
    }
}
