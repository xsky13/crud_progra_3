import { redirect } from "react-router";

// loader para rutas que no se pueden acceder despues de login
export default function authCheckLoader(): Response | void {
    // obtener token
    const storedUser = sessionStorage.getItem("user");
    // hacer llamada a backend
    if (storedUser) return redirect("/"); // usuario existe
}
