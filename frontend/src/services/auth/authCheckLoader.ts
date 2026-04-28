import { redirect } from "react-router";

export default function authCheckLoader(): Response | void {
    // obtener token
    const storedUser = sessionStorage.getItem("user")
    // hacer llamada a backend
    if (storedUser) return redirect("/"); // usuario existe
}