import { AppLink } from "@/components/Helpers/AppLink";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import AdminHomeView from "@/components/Views/AdminHomeView";
import useUser from "@/hooks/useUser";
import { ArrowRight, ChefHat } from "lucide-react";
import { useLoaderData } from "react-router";
import type { Comida } from "@/types/Comida";
import { UserRole } from "@/types/User";
import UserHomeView from "@/components/Views/UserHomeView";

// ── Main component ────────────────────────────────────────────────────────────
export default function Home() {
    const user = useUser();

    const data = useLoaderData() as { comidas: Comida[] };

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
        <div className="min-h-screen bg-background text-foreground">
            {/* ── NAVBAR ── */}
            <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <ChefHat className="size-4" />
                        </div>
                        <span className="text-sm font-semibold tracking-tight">
                            Comedor UAP
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <AppLink to="/registro">Registrarse</AppLink>
                        </Button>
                        <Button size="sm" asChild>
                            <AppLink to="/login">Iniciar sesión</AppLink>
                        </Button>
                    </div>
                </div>
            </header>

            {/* ── HERO ── */}
            <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <span className="size-1.5 shrink-0 rounded-full bg-green-500" />
                    Universidad Adventista del Plata
                </div>

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
                    <Button size="lg" variant="outline" asChild>
                        <AppLink to="/login">Iniciar sesión</AppLink>
                    </Button>
                </div>
            </section>
            {/* ── FOOTER ── */}
            <footer className="border-t border-border py-6">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex size-5 items-center justify-center rounded bg-primary text-primary-foreground">
                            <ChefHat className="size-3" />
                        </div>
                        <span className="text-sm font-semibold">
                            Comedor UAP
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        © 2025 Universidad Adventista del Plata · Todos los
                        derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
