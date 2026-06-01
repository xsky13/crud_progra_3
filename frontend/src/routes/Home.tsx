import { AppLink } from "@/components/Helpers/AppLink";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import AdminHomeView from "@/components/Views/AdminHomeView";
import useUser from "@/hooks/useUser";
import { ArrowRight } from "lucide-react";
import { useLoaderData } from "react-router";
import type { ComidaView } from "@/types/Comida";
import { UserRole } from "@/types/User";
import UserHomeView from "@/components/Views/UserHomeView";

// ── Main component ────────────────────────────────────────────────────────────
export default function Home() {
    const user = useUser();

    const data = useLoaderData() as { comidas: ComidaView[] };

    return user ? (
        <>
            <Header />
            <div className="py-28">
                {user.rol == UserRole.Usuario ? (
                    <UserHomeView comidas={data.comidas} />
                ) : (
                    <AdminHomeView comidas={data.comidas} />
                )}
            </div>
        </>
    ) : (
        <>
            <div className="text-center h-screen flex flex-col justify-center items-center -mt-10">
                <img
                    src="/uap_logo.svg"
                    className="mb-6"
                    width={300}
                    alt="logo uap"
                />

                <h1 className="mx-auto max-w-2xl text-5xl font-extrabold tracking-tight text-balance">
                    Calificá la comida{" "}
                    <span className="text-muted-foreground">
                        del comedor UAP.
                    </span>
                </h1>

                <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                    Puntuá platos, dejá comentarios y ayudá a mejorar la
                    experiencia gastronómica de toda la comunidad universitaria.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Button size="lg" asChild>
                        <AppLink to="/registro">
                            Crear cuenta <ArrowRight className="size-4" />
                        </AppLink>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                        <AppLink to="/login">Iniciar sesión</AppLink>
                    </Button>
                </div>
            </div>
        </>
    );
}
