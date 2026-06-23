import type { ActionFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";
import { redirect } from "react-router";
import { foods } from "../food/loadFood";

export default async function deleteAccount({request}: ActionFunctionArgs): Promise<FormError | Response> {
    try{
        await api.post("/User/logout").then( async () => await api.delete("/User"));

        return redirect("/login");    
    } catch (error) {
        return manageRequestError(error);
    }
}
