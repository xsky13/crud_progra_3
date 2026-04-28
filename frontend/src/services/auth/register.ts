import { userContext } from "@/context/userContext";
import { UserRole } from "@/types/User";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

type RegisterFormData = {
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
};

export default async function register({
    request,
    context,
}: LoaderFunctionArgs): Promise<
    { error?: { msg: string; field: string } } | Response
> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as RegisterFormData;

    if (data.nombre.length == 0) {
        return {
            error: { msg: "Su nombre no puede estar vacio", field: "nombre" },
        };
    } else if (data.apellido.length == 0) {
        return {
            error: {
                msg: "Su apellido no puede estar vacio",
                field: "apellido",
            },
        };
    } else if (
        !data.email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
    ) {
        return { error: { msg: "Su email no es valido", field: "email" } };
    } else if (data.contrasena.length < 6) {
        return {
            error: {
                msg: "Su contrasena debe tener por lo menos 6 caracteres",
                field: "contrasena",
            },
        };
    } else {
        // hacer post request a backend
        await fetch("https://jsonplaceholder.typicode.com/todos/1");

        // usar el usuario retornado para setear la data (token en realidad)
        sessionStorage.setItem("user", JSON.stringify({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            contrasena: data.contrasena,
            rol: UserRole.Usuario,
            loggedIn: true,
        }));

        return redirect("/");
    }
}
