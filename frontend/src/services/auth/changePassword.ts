import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";
import type { ActionFunctionArgs } from "react-router";

type SentData = {
    oldPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
}

export default async function changePassword({ request }: ActionFunctionArgs): Promise<FormError> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as SentData;

    if (data.newPassword.length < 6)
        return { ok: false, error: { msg: "La contrasena nueva debe tener por lo menos 6 caracteres.", field: "newPassword" } };

    if (data.newPasswordRepeat != data.newPassword)
        return { ok: false, error: { msg: "Las contrasenas no coinciden.", field: "newPassword" } };
    console.log(data);
    try {
        await api.put("/User/changePassword", data);
        return { ok: true };
    } catch (err) {
        return manageRequestError(err);
    }
}
