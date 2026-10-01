import type { ActionFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";
import { redirect } from "react-router";

export default async function deleteAccount({request}: ActionFunctionArgs): Promise<FormError | void> {
    try {
        //await api.post("/User/logout");
        await api.delete("/User");
        window.location.href = "/login";
       //return redirect("/login");    
    } catch (error) {
        return manageRequestError(error);
    }
}
