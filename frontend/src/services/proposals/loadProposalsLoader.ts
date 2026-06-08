import type { User } from "@/types/User";
import { UserRole } from "@/types/User";
import loadProposals from "./loadProposals";
import loadAdminProposals from "./loadAdminProposals";
import { redirect } from "react-router";

export default async function loadProposalsLoader() {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) return redirect("/");

    const user = JSON.parse(storedUser) as User;

    if (user.rol === UserRole.Admin) {
        return loadAdminProposals();
    }

    return loadProposals();
}
