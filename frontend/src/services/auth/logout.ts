import { redirect } from "react-router";

export default function logout(): Response {
    sessionStorage.removeItem("user");
    return redirect("/login");
}