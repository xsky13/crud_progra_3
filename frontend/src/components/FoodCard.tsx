import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Comida } from "@/types/Comida";
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

export default function FoodCard({ comida }: { comida: Comida }) {
    const currentUser = useUser();
    if (!currentUser) return null;

    return (
        <Card className="w-full max-w-sm pt-0">
            <img
                src={comida.img_url}
                alt="Event cover"
                className="aspect-video w-full object-cover"
            />
            <CardHeader>
                <CardTitle className="font-bold border-black w-fit">
                    {comida.titulo}
                </CardTitle>
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
                                cantidad_calificaciones={
                                    comida.cantidad_calificaciones
                                }
                                promedio_estrellas={comida.promedio_estrellas}
                            />
                        </CardDescription>
                    </>
                ) : (
                    <>
                        <CardAction>
                            <PromedioEstrellas
                                cantidad_calificaciones={
                                    comida.cantidad_calificaciones
                                }
                                promedio_estrellas={comida.promedio_estrellas}
                            />
                        </CardAction>
                        <CardDescription className="mt-2">
                            <div className="flex gap-2 items-center text-amber-400">
                                <StarIcon size={20} />
                                <StarIcon size={20} />
                                <StarIcon size={20} />
                                <StarIcon size={20} />
                                <StarIcon size={20} />
                            </div>
                        </CardDescription>
                    </>
                )}
            </CardHeader>
            {currentUser.rol == UserRole.Usuario && (
                <>
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
