import { UserRole, type User } from "@/types/User";
import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";

type LoginFormData = {
    email: string;
    contrasena: string;
};

const userNormal: User = {
    nombre: "Test",
    apellido: "Test",
    email: "test@gmail.com",
    contrasena: "123456",
    rol: UserRole.Usuario,
};

const userAdmin: User = {
    nombre: "Admin",
    apellido: "Admin",
    email: "admin@gmail.com",
    contrasena: "123456",
    rol: UserRole.Admin,
};

export default async function login({
    request,
}: ActionFunctionArgs): Promise<
    { error?: { msg: string; field: string } } | Response
> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as LoginFormData;

    let loggedInUser: User;

    // cuando haya db reemplazar con llamada y retornar respuesta simplemente
    await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (data.email != userNormal.email && data.email != userAdmin.email) {
        return {
            error: { msg: "No hay un usuario con ese email", field: "email" },
        };
    }

    loggedInUser = [userNormal, userAdmin].filter(
        (u) => u.email == data.email,
    )[0];
    if (data.contrasena != loggedInUser.contrasena) {
        return {
            error: { msg: "Contraseña incorrecta", field: "contrasena" },
        };
    }

    //guardar el token retornado en session storage
    sessionStorage.setItem("user", JSON.stringify(loggedInUser));

    return redirect("/");
}
