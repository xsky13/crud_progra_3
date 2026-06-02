import Header from "@/components/Header";
import UserPropuestaView from "@/components/Views/Propuestas/UserPropuestaView";
import useUser from "@/hooks/useUser"
import type { ComidaView } from "@/types/Comida";
import { useLoaderData } from "react-router";
import { Navigate } from "react-router";

export default function Propuestas() {
    const user = useUser();
    const data = useLoaderData() as { proposals: ComidaView[] };

    return user ? (
        <>
            <Header />
            <div className="py-28">
                <UserPropuestaView propuestas={data.proposals} />
                {/*{user.rol == UserRole.Usuario ? (
                    <UserHomeView comidas={data.comidas} />
                ) : (
                    <AdminHomeView comidas={data.comidas} />
                )}*/}
            </div>
        </>
    ) : <Navigate to={"/"} />
}
