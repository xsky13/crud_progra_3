import type { User } from "@/types/User";
import { UserRole } from "@/types/User";
import loadProposals from "./loadProposals";
import loadAdminProposals from "./loadAdminProposals";
import { redirect } from "react-router";

export default async function loadProposalsLoader() {
    const user = JSON.parse(sessionStorage.getItem("user")) as User;

    if (!user) return redirect("/");

    if (user.rol === UserRole.Admin) {
        return loadAdminProposals();
    }

    return loadProposals();
}
