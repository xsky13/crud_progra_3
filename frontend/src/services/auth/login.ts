import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";

type LoginFormData = {
    email: string;
    contrasena: string;
};

export default async function login({
    request,
}: ActionFunctionArgs): Promise<FormError | Response> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as LoginFormData;

    try {
        await api.post("/User/login", data);
        return redirect("/");
    } catch (error) {
        return manageRequestError(error);
    }
}
