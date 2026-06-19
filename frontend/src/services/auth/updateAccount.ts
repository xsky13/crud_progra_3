import type { ActionFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";

type UpdateAccountFormData = {
    nombre: string;
    email: string;
    contrasena: string;
};

export default async function updateAccount({ request }: ActionFunctionArgs): Promise<FormError> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as UpdateAccountFormData;

    if (data.nombre.trim().length === 0) {
        return {
            error: { msg: "Su nombre no puede estar vacío", field: "nombre" },
        };
    }

    if (
        !data.email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.\(".+"\))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
    ) {
        return { error: { msg: "Su correo electrónico no es válido", field: "email" } };
    }

    if (data.contrasena.length > 0 && data.contrasena.length < 6) {
        return {
            error: {
                msg: "Su contraseña debe tener por lo menos 6 caracteres",
                field: "contrasena",
            },
        };
    }

    try {
        await api.put("/User", data);
        return { ok: true };
    } catch (error) {
        return manageRequestError(error);
    }
}
