import { redirect } from "react-router";

export default function authProtectedLoader(): Response | void {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) return redirect("/login");
}
