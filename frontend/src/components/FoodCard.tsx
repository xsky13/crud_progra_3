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
            <div className="flex gap-1 items-center font-bold text-black">
                <StarIcon size={17} fill="black" /> {promedio_estrellas}/5
            </div>
            <div className="text-xs text-muted-foreground">
                {cantidad_calificaciones} calificaciones
            </div>
        </div>
    );
};

export default function FoodCard({ comida }: { comida: ComidaView }) {
    const currentUser = useUser();
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
                        <PromedioEstrellas
                            cantidad_calificaciones={comida.cantidad_calificaciones}
                            promedio_estrellas={comida.promedio_estrellas}
                        />
                    </CardAction>
                )}
            </CardHeader>
            {currentUser.rol == UserRole.Usuario && (
                <>
                    <CardDescription className="">
                        <div className="flex flex-col items-center justify-center py-7 rounded-md w-full -mt-4">
                            <div className="flex justify-center text-amber-400">
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
                                            size={20}
                                            fill={
                                                comida.usuario_califica &&
                                                    i < comida.calificacion_usuario
                                                    ? "#ffba00"
                                                    : "#FFFFFF"
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                            {comida.calificacion_usuario && (
                                <Button variant="ghost-destructive" className="mt-3">
                                    Eliminar mi calificacion
                                </Button>
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
