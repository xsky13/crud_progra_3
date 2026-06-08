import type { LoaderFunctionArgs } from "react-router";
import type { User } from "@/types/User";
import { UserRole } from "@/types/User";
import loadProposals from "./loadProposals";
import loadAdminProposals from "./loadAdminProposals";

export default async function loadProposalsLoader(args: LoaderFunctionArgs) {
    const user = JSON.parse(sessionStorage.getItem("user") ?? "{}") as User;
    
    if (user.rol === UserRole.Admin) {
        return loadAdminProposals();
    }
    
    return loadProposals();
}
