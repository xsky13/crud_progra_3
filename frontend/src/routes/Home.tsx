import { AppLink } from "@/components/AppLink";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useUser from "@/hooks/useUser";
import {
    ArrowRight,
    ChefHat,
    ShieldCheck,
    Star,
    Trophy,
    MessageSquare,
    Plus,
    BarChart3,
    GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";

// ── FAQ data ──────────────────────────────────────────────────────────────────
const faqs = [
    {
        q: "¿Quién puede registrarse?",
        a: "Solo alumnos activos de la Universidad Adventista del Plata. El registro requiere un correo institucional @uap.edu.ar y un número de alumno válido.",
    },
    {
        q: "¿Cómo califico una comida?",
        a: "Una vez dentro, buscá el plato en el catálogo, seleccioná de 1 a 5 estrellas y, si querés, agregá un comentario escrito. Podés calificar cada comida una vez por visita al comedor.",
    },
    {
        q: "¿Puedo sugerir una comida nueva?",
        a: "Sí. Si no encontrás un plato en el catálogo, podés enviarlo como sugerencia desde tu perfil. El administrador lo revisará y, si corresponde, lo agregará para que todos puedan calificarlo.",
    },
    {
        q: "¿Con qué frecuencia se actualiza el podio semanal?",
        a: "El podio semanal se reinicia cada lunes a medianoche. El podio general acumula todos los votos desde el lanzamiento de la plataforma y se actualiza en tiempo real.",
    },
    {
        q: "¿Los cocineros pueden ver mis comentarios?",
        a: "Sí, los comentarios son visibles para los cocineros a través del panel de análisis, identificados por nombre de usuario, no por datos personales.",
    },
    {
        q: "¿Qué pasa si olvidé mi contraseña?",
        a: "Desde la pantalla de inicio de sesión podés solicitar un enlace de recuperación a tu correo institucional. El proceso tarda menos de un minuto.",
    },
];

// ── Podium mock data ──────────────────────────────────────────────────────────
const podiumItems = [
    {
        pos: 1,
        emoji: "🥩",
        name: "Milanesa napolitana",
        cat: "Plato principal",
        score: "4.9",
        votes: 142,
    },
    {
        pos: 2,
        emoji: "🍮",
        name: "Flan casero",
        cat: "Postre",
        score: "4.8",
        votes: 87,
    },
    {
        pos: 3,
        emoji: "🥤",
        name: "Jugo de naranja",
        cat: "Bebida",
        score: "4.7",
        votes: 74,
    },
    {
        pos: 4,
        emoji: "🍝",
        name: "Fideos con tuco",
        cat: "Plato principal",
        score: "4.5",
        votes: 98,
    },
    {
        pos: 5,
        emoji: "🥗",
        name: "Ensalada mixta",
        cat: "Entrada",
        score: "4.3",
        votes: 61,
    },
];

// ── FAQ item component ────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-border last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-colors hover:text-muted-foreground"
            >
                <span>{q}</span>
                <span
                    className="text-muted-foreground text-lg leading-none shrink-0 transition-transform duration-200"
                    style={{ transform: open ? "rotate(45deg)" : "none" }}
                >
                    +
                </span>
            </button>
            <div
                className="overflow-hidden text-sm text-muted-foreground leading-relaxed transition-all duration-300"
                style={{
                    maxHeight: open ? "200px" : "0",
                    paddingBottom: open ? "16px" : "0",
                }}
            >
                {a}
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Home() {
    const user = useUser();

    return user ? (
        <div className="flex w-full justify-between items-center">
            <h1>
                Bienvenido {user.nombre} {user.apellido}
            </h1>
            <Form action="/logout" method="post">
                <Button type="submit">Log out</Button>
            </Form>
        </div>
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

                    <nav className="hidden items-center gap-1 md:flex">
                        {[
                            "#como-funciona",
                            "#funcionalidades",
                            "#roles",
                            "#faq",
                        ].map((href, i) => (
                            <a
                                key={href}
                                href={href}
                                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                {
                                    [
                                        "Cómo funciona",
                                        "Funcionalidades",
                                        "Roles",
                                        "FAQ",
                                    ][i]
                                }
                            </a>
                        ))}
                    </nav>

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

            {/* ── MOCK PREVIEW ── */}
            <div className="mx-auto max-w-3xl px-6 pb-20">
                <div className="overflow-hidden rounded-xl border border-border shadow-lg">
                    {/* browser bar */}
                    <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5">
                        <div className="flex gap-1.5">
                            <div className="size-2.5 rounded-full bg-red-400" />
                            <div className="size-2.5 rounded-full bg-yellow-400" />
                            <div className="size-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 rounded border border-border bg-background px-3 py-0.5 font-mono text-xs text-muted-foreground">
                            comedor.uap.edu.ar/menu
                        </div>
                    </div>
                    {/* cards */}
                    <div className="grid grid-cols-3 gap-3 bg-background p-4">
                        {[
                            {
                                emoji: "🥩",
                                name: "Milanesa napolitana",
                                stars: 5,
                                pct: 94,
                                votes: "142 votos",
                            },
                            {
                                emoji: "🍝",
                                name: "Fideos con tuco",
                                stars: 4,
                                pct: 78,
                                votes: "98 votos",
                            },
                            {
                                emoji: "🍮",
                                name: "Flan casero",
                                stars: 5,
                                pct: 91,
                                votes: "87 votos",
                            },
                        ].map((item) => (
                            <div
                                key={item.name}
                                className="flex flex-col gap-2 rounded-lg border border-border p-3"
                            >
                                <span className="text-2xl">{item.emoji}</span>
                                <p className="text-xs font-semibold leading-tight">
                                    {item.name}
                                </p>
                                <p className="text-xs text-primary">
                                    {"★".repeat(item.stars)}
                                    {"☆".repeat(5 - item.stars)}
                                </p>
                                <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: `${item.pct}%` }}
                                    />
                                </div>
                                <p className="font-mono text-[10px] text-muted-foreground">
                                    {item.votes}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Separator />

            {/* ── CÓMO FUNCIONA ── */}
            <section
                id="como-funciona"
                className="mx-auto max-w-5xl px-6 py-20"
            >
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Cómo funciona
                </p>
                <h2 className="mb-3 max-w-sm">Simple desde el primer día</h2>
                <p className="mb-12 max-w-md text-base text-muted-foreground">
                    Solo necesitás tu cuenta de la universidad para empezar a
                    opinar.
                </p>

                <div
                    className="grid grid-cols-1 overflow-hidden rounded-xl border border-border sm:grid-cols-2 lg:grid-cols-4"
                    style={{ gap: "1px", background: "var(--color-border)" }}
                >
                    {[
                        {
                            num: "01",
                            icon: <GraduationCap className="size-4" />,
                            title: "Registrate con tu cuenta UAP",
                            desc: "Usá tu correo institucional y número de alumno. Solo estudiantes y personal de la UAP pueden acceder.",
                        },
                        {
                            num: "02",
                            icon: <Star className="size-4" />,
                            title: "Explorá el catálogo de comidas",
                            desc: "Navegá por platos, bebidas, postres y más. Encontrá lo que comiste hoy o buscá un favorito.",
                        },
                        {
                            num: "03",
                            icon: <MessageSquare className="size-4" />,
                            title: "Puntuá y comentá",
                            desc: "Dale de 1 a 5 estrellas a cada comida y dejá tu opinión para ayudar a mejorar el menú.",
                        },
                        {
                            num: "04",
                            icon: <Trophy className="size-4" />,
                            title: "Seguí los podios",
                            desc: "Mirá el ranking semanal y general de los platos más queridos de toda la comunidad.",
                        },
                    ].map((step) => (
                        <div
                            key={step.num}
                            className="flex flex-col gap-3 bg-background p-6"
                        >
                            <span className="font-mono text-[11px] text-muted-foreground">
                                {step.num}
                            </span>
                            <div className="flex size-8 items-center justify-center rounded-md border border-border bg-muted text-foreground">
                                {step.icon}
                            </div>
                            <h5 className="font-semibold">{step.title}</h5>
                            <p className="text-sm text-muted-foreground">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            {/* ── FUNCIONALIDADES ── */}
            <section id="funcionalidades" className="bg-muted/40 py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Funcionalidades
                    </p>
                    <h2 className="mb-3 max-w-sm">Todo en un solo lugar</h2>
                    <p className="mb-12 max-w-md text-base text-muted-foreground">
                        Un espacio diseñado para que cada voz de la comunidad
                        UAP cuente.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: <Star className="size-5" />,
                                bg: "bg-amber-100 text-amber-700",
                                title: "Calificaciones con estrellas",
                                desc: "Puntuá cada plato, bebida o postre del 1 al 5. Tu voto contribuye al puntaje promedio visible para todos.",
                            },
                            {
                                icon: <MessageSquare className="size-5" />,
                                bg: "bg-blue-100 text-blue-700",
                                title: "Comentarios de retroalimentación",
                                desc: "Dejá reseñas escritas sobre lo que más o menos te gustó. La cocina las lee para mejorar.",
                            },
                            {
                                icon: <Trophy className="size-5" />,
                                bg: "bg-green-100 text-green-700",
                                title: "Podio semanal y general",
                                desc: "Rankings actualizados con las comidas más valoradas de la semana y de todos los tiempos.",
                            },
                            {
                                icon: <Plus className="size-5" />,
                                bg: "bg-orange-100 text-orange-700",
                                title: "Sugerencia de comidas",
                                desc: "Si no encontrás un plato en el catálogo, podés sugerirlo. El administrador lo revisa y lo aprueba si corresponde.",
                            },
                            {
                                icon: <BarChart3 className="size-5" />,
                                bg: "bg-purple-100 text-purple-700",
                                title: "Panel de análisis para cocineros",
                                desc: "Estadísticas de satisfacción por plato: promedios, tendencias y comentarios destacados.",
                            },
                            {
                                icon: <ShieldCheck className="size-5" />,
                                bg: "bg-rose-100 text-rose-700",
                                title: "Acceso exclusivo UAP",
                                desc: "Registro solo con email institucional y número de alumno. La comunidad califica, la comunidad decide.",
                            },
                        ].map((f) => (
                            <div
                                key={f.title}
                                className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md"
                            >
                                <div
                                    className={`flex size-9 items-center justify-center rounded-lg ${f.bg}`}
                                >
                                    {f.icon}
                                </div>
                                <h5 className="font-semibold">{f.title}</h5>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Separator />

            {/* ── PODIO DEMO ── */}
            <section className="mx-auto max-w-5xl px-6 py-20">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
                    <div className="lg:flex-1">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Podio semanal
                        </p>
                        <h2 className="mb-4">Los más votados de la semana</h2>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Cada lunes se renueva el ranking. ¿Qué platos van a
                            liderar esta semana? Entrá, calificá y hacé que tu
                            favorito llegue al primer puesto.
                        </p>
                    </div>
                    <div className="w-full lg:flex-1">
                        <div className="overflow-hidden rounded-xl border border-border">
                            <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-3">
                                <span className="text-sm font-semibold">
                                    🏆 Top comidas — esta semana
                                </span>
                                <span className="rounded-full bg-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                                    en vivo
                                </span>
                            </div>
                            <div>
                                {podiumItems.map((item) => (
                                    <div
                                        key={item.pos}
                                        className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-muted/50"
                                    >
                                        <span
                                            className={`w-5 shrink-0 text-center font-mono text-sm font-semibold ${
                                                item.pos === 1
                                                    ? "text-amber-500"
                                                    : item.pos === 2
                                                      ? "text-slate-400"
                                                      : item.pos === 3
                                                        ? "text-amber-700"
                                                        : "text-muted-foreground"
                                            }`}
                                        >
                                            {String(item.pos).padStart(2, "0")}
                                        </span>
                                        <span className="text-xl">
                                            {item.emoji}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="truncate text-sm font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {item.cat}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm font-semibold">
                                            <Star className="size-3 fill-primary text-primary" />
                                            {item.score}
                                            <span className="font-mono text-[11px] text-muted-foreground ml-1">
                                                {item.votes}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator />

            {/* ── ROLES ── */}
            <section id="roles" className="bg-muted/40 py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Roles
                    </p>
                    <h2 className="mb-3">Una plataforma para todos</h2>
                    <p className="mb-12 max-w-md text-base text-muted-foreground">
                        Cada usuario tiene su propio espacio según su rol dentro
                        de la comunidad.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            {
                                icon: <GraduationCap className="size-5" />,
                                title: "Alumno",
                                sub: "El corazón de la plataforma",
                                items: [
                                    "Calificá platos con 1 a 5 estrellas",
                                    "Dejá comentarios de retroalimentación",
                                    "Explorá el catálogo completo de comidas",
                                    "Seguí el podio semanal y general",
                                    "Sugerí comidas que no estén en el catálogo",
                                ],
                            },
                            {
                                icon: <ChefHat className="size-5" />,
                                title: "Cocinero",
                                sub: "Análisis y mejora continua",
                                items: [
                                    "Accedé al panel de satisfacción por plato",
                                    "Visualizá promedios y tendencias históricas",
                                    "Leé comentarios de los alumnos",
                                    "Detectá qué preparaciones necesitan ajustes",
                                ],
                            },
                            {
                                icon: <ShieldCheck className="size-5" />,
                                title: "Administrador",
                                sub: "Gestión del catálogo",
                                items: [
                                    "Aprobá o rechazá sugerencias de comidas",
                                    "Gestioná el catálogo completo del comedor",
                                    "Moderá comentarios inapropiados",
                                    "Accedé a estadísticas globales de la plataforma",
                                ],
                            },
                        ].map((role) => (
                            <div
                                key={role.title}
                                className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted">
                                        {role.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {role.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {role.sub}
                                        </p>
                                    </div>
                                </div>
                                <ul className="flex flex-col gap-2">
                                    {role.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2 text-sm text-muted-foreground"
                                        >
                                            <span className="mt-0.5 shrink-0 text-muted-foreground/50">
                                                –
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Separator />

            {/* ── CTA ── */}
            <section className="mx-auto max-w-5xl px-6 py-20">
                <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border p-8 sm:flex-row sm:items-center">
                    <div>
                        <h3 className="mb-1.5">¿Sos alumno de la UAP?</h3>
                        <p className="text-sm text-muted-foreground">
                            Registrate con tu email institucional y número de
                            alumno para empezar a calificar.
                        </p>
                    </div>
                    <div className="flex shrink-0 gap-3">
                        <Button size="lg" asChild>
                            <AppLink to="/registro">Crear cuenta</AppLink>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <AppLink to="/login">Ya tengo cuenta</AppLink>
                        </Button>
                    </div>
                </div>
            </section>

            <Separator />

            {/* ── FAQ ── */}
            <section id="faq" className="mx-auto max-w-5xl px-6 py-20">
                <div className="mx-auto max-w-xl">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Preguntas frecuentes
                    </p>
                    <h2 className="mb-8">¿Tenés dudas?</h2>
                    <div>
                        {faqs.map((f) => (
                            <FaqItem key={f.q} q={f.q} a={f.a} />
                        ))}
                    </div>
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
// import { Button } from "../components/ui/button";
// import { AppLink } from "@/components/AppLink";

// export default function Home() {
//     return (
//         <div>
//             <h1>Fuap</h1>
//             <AppLink to={"/registro"}>Registrarse</AppLink>
//             <br />
//             <Button>fuap</Button>

//         </div>
//     );
// }
