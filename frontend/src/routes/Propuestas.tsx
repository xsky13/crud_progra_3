import Header from "@/components/Header";
import UserPropuestaView from "@/components/Views/Propuestas/UserPropuestaView";
import useUser from "@/hooks/useUser"
import type { ComidaView } from "@/types/Comida";
import { UserRole } from "@/types/User";
import { useLoaderData } from "react-router";
import { Navigate } from "react-router";

export default function Propuestas() {
    const user = useUser();
    const data = useLoaderData() as { proposals: ComidaView[] };

    return user ? (
        <>
            <Header />
            <div className="py-28">
                {user.rol == UserRole.Usuario ? (
                    <UserPropuestaView propuestas={data.proposals} />
                ) : (
                    // implementar vista de admin
                    <></>
                )}
            </div>
        </>
    ) : <Navigate to={"/"} />
}
