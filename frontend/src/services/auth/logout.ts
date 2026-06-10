import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";
import { redirect } from "react-router";
export default async function logout(): Promise<FormError | Response> {
    try {
         await api.post("/User/logout");
        return redirect("/");
    } catch (error) {
        return manageRequestError(error);
    }
}
