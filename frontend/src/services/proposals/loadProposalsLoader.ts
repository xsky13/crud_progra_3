import { UserRole } from "@/types/User";
import loadProposals from "./loadProposals";
import loadAdminProposals from "./loadAdminProposals";
import api from "@/api";
import { redirect } from "react-router";

export default async function loadProposalsLoader() {
    const user = await api.get("/User/me")
        .then(res => res.data)
        .catch(() => redirect("/login"));

    if (user === UserRole.Admin) {
        return loadAdminProposals();
    }

    return loadProposals();
}
