import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { ComidaView } from "@/types/Comida";
import { UserRole } from "@/types/User";
import { MessageSquareText, StarIcon } from "lucide-react";
import useUser from "@/hooks/useUser";
import EditFoodModal from "./AdminComponents/EditFoodModal";
import DeleteFood from "./AdminComponents/DeleteFood";
import { useFetcher } from "react-router";
import { useRef } from "react";
import EditProposal from "./Proposals/EditProposal";

const PromedioEstrellas = ({
    promedio_estrellas,
    cantidad_calificaciones,
    start,
}: {
    promedio_estrellas: number;
    cantidad_calificaciones: number;
    start?: boolean;
}) => {
    return (
        <div
            className={`inline-flex flex-col items-${start ? "start" : "end"}`}
        >
            <div className="flex gap-1 items-center font-bold text-black dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                {Math.round(((promedio_estrellas + Number.EPSILON) * 10)) / 10}/5
            </div>
            <div className="text-xs text-muted-foreground">
                {cantidad_calificaciones} calificaciones
            </div>
        </div>
    );
};

export default function FoodCard({ comida }: { comida: ComidaView }) {
    const currentUser = useUser();
    const fetcher = useFetcher();
    const starsParentRef = useRef<HTMLDivElement | null>(null);
    if (!currentUser) return null;

    const hoverStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
        if (comida.calificacion_usuario) return;

        const children = Array.from(e.currentTarget.parentElement!.children) as HTMLElement[];
        children.forEach((child, i) =>
            i <= idx ? ((child.children[0] as SVGElement).style.fill = "#FFB900") : null,
        );
    };

    const unhoverStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
        if (comida.calificacion_usuario) return;

        const children = Array.from(e.currentTarget.parentElement!.children) as HTMLElement[];
        children.forEach((child, i) =>
            i <= idx ? ((child.children[0] as SVGElement).style.fill = "transparent") : null,
        );
    };

    const rateFood = (rating: number) => {
        if (comida.usuario_califica) return;
        fetcher.submit({ rating }, {
            method: "POST",
            encType: "application/json",
            action: `/rateFood/${comida.id}`
        })
    }

    const unrateFood = () => {
        fetcher.submit({}, {
            method: "POST",
            encType: "application/json",
            action: `/unrateFood/${comida.id}`
        });

        // hacer que las estrellas esten blancas
        if (starsParentRef.current) {
            console.log(starsParentRef.current.children)
            Array.from(starsParentRef.current.children).forEach((child) => {
                const icon = child.children[0] as SVGElement | undefined;
                if (icon) icon.style.fill = "transparent";
            })
        }
    }

    return (
        <Card className="w-full max-w-sm pt-0">
            <img
                src={comida.img_url}
                alt="Event cover"
                className="aspect-video w-full object-cover"
            />
            <CardHeader className="items-center">
                <CardTitle className="tracking-wide">{comida.titulo}</CardTitle>
                {currentUser.rol == UserRole.Admin ? (
                    <>
                        <CardAction>
                            <div className="flex">
                                <EditFoodModal comida={comida} />
                                <DeleteFood comidaId={comida.id} />
                            </div>
                        </CardAction>
                        <CardDescription className="my-2 w-full">
                            <PromedioEstrellas
                                start={true}
                                cantidad_calificaciones={comida.cantidad_calificaciones}
                                promedio_estrellas={comida.promedio_estrellas}
                            />
                        </CardDescription>
                    </>
                ) : (
                    <CardAction>
                        {
                            comida.confirmada ?
                                <PromedioEstrellas
                                    cantidad_calificaciones={comida.cantidad_calificaciones}
                                    promedio_estrellas={comida.promedio_estrellas}
                                />
                                :
                                <>
                                    <EditProposal comidaId={comida.id} comidaTitle={comida.titulo} />
                                    <DeleteFood comidaId={comida.id} />
                                </>
                        }
                    </CardAction>
                )}
            </CardHeader>
            {(currentUser.rol == UserRole.Usuario && comida.confirmada) && (
                <>
                    <CardDescription className="">
                        <div className="flex flex-col items-center justify-center py-5 rounded-md w-full -mt-2">
                            <div className="flex justify-center text-amber-400" ref={starsParentRef}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="px-1 first:pl-0"
                                        onMouseOut={(e) => unhoverStar(e, i)}
                                        onMouseOver={(e) => hoverStar(e, i)}
                                    >
                                        <StarIcon
                                            className={
                                                !comida.usuario_califica
                                                    ? "cursor-pointer"
                                                    : "cursor-default"
                                            }
                                            onClick={() => rateFood(i + 1)}
                                            size={20}
                                            fill={
                                                comida.usuario_califica &&
                                                    comida.calificacion_usuario != null &&
                                                    i < comida.calificacion_usuario
                                                    ? "#ffba00"
                                                    : "transparent"
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                            {comida.calificacion_usuario && (
                                <span
                                    className="cursor-pointer mt-3 text-red-700 tracking-wide hover:text-red-800"
                                    onClick={unrateFood}
                                >
                                    Eliminar mi calificacion
                                </span>
                            )}
                        </div>
                    </CardDescription>
                    <CardFooter>
                        <Button
                            className="w-full font-medium"
                            variant="secondary"
                        >
                            <MessageSquareText />
                            Ver comentarios
                        </Button>
                    </CardFooter>
                </>
            )}
        </Card>
    );
}
