import api from "@/api";
import { redirect } from "react-router";

export default async function loadProposals() {
    await api.get("/User/me")
        .then(res => res.data)
        .catch(() => redirect("/login"));

    const proposals = await api.get("/Propuesta")
        .then(res => res.data)
        .catch(err => console.log(err));

    return { proposals };
}
