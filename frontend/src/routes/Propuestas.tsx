import Header from "@/components/Header";
import UserPropuestaView from "@/components/Views/Propuestas/UserPropuestaView";
import useUser from "@/hooks/useUser"
import { Navigate } from "react-router";

export default function Propuestas() {
    const user = useUser();

    return user ? (
        <>
            <Header />
            <div className="py-28">
                <UserPropuestaView />
                {/*{user.rol == UserRole.Usuario ? (
                    <UserHomeView comidas={data.comidas} />
                ) : (
                    <AdminHomeView comidas={data.comidas} />
                )}*/}
            </div>
        </>
    ) : <Navigate to={"/"} />
}
