import type { ActionFunctionArgs } from "react-router";
import type { User } from "@/types/User";
import { redirect } from "react-router";

type UpdateAccountFormData = {
    nombre: string;
    email: string;
    contrasena: string;
};

export default async function updateAccount({ request }: ActionFunctionArgs): Promise<{ error?: { msg: string; field: string }; success?: true } | Response> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as UpdateAccountFormData;

    if (data.nombre.trim().length === 0) {
        return {
            error: { msg: "El nombre no puede estar vacío", field: "nombre" },
        };
    }

    if (
        !data.email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|.(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
    ) {
        return {
            error: { msg: "El correo no es válido", field: "email" },
        };
    }

    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) return redirect("/login");

    const user = JSON.parse(storedUser) as User;

    if (data.contrasena.length > 0 && data.contrasena.length < 6) {
        return {
            error: {
                msg: "La contraseña debe tener al menos 6 caracteres",
                field: "contrasena",
            },
        };
    }

    const updatedUser: User = {
        ...user,
        nombre: data.nombre.trim(),
        email: data.email.trim(),
        contrasena: data.contrasena.length > 0 ? data.contrasena : user.contrasena,
    };

    sessionStorage.setItem("user", JSON.stringify(updatedUser));

    return { success: true };
}
