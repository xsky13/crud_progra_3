import type { LoaderFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";

export default async function loadPodio({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const order = url.searchParams.get("order") ?? "desc";

    try {
        const response = await api.get(`/Comida/byPromedio?order=${order}`);
        return response.data;
    } catch (err) {
        return manageRequestError(err);
    }
}
