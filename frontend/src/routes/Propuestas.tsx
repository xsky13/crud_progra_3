import Header from "@/components/Header";
import UserPropuestaView from "@/components/Views/Propuestas/UserPropuestaView";
import AdminPropuestaView from "@/components/Views/Propuestas/AdminPropuestaView";
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
                    <AdminPropuestaView propuestas={data.proposals} />
                )}
            </div>
        </>
    ) : <Navigate to={"/"} />
}
