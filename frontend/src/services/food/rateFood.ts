import type { ComidaView } from "@/types/Comida";
import { foods } from "./loadFood";
import type { ActionFunctionArgs } from "react-router";

export default async function rateFood({ request, params }: ActionFunctionArgs): Promise<{
    comida?: ComidaView,
    error?: string
}> {
    const data = await request.json();

    const comida = foods.filter(food => food.id == parseInt(params.id))[0];
    if (!comida) return { error: "La comida no existe." };

    // formula para conseguir cantidad la cantidad de estrellas que genio que soy
    // promedio = (n+n+n...)/cantidad -> n+n+n+... = promedio*cantidad, entonces al actualizar:
    // como hay una nueva calificacion, agregarla al promedio y +1 a la cantidad de calificaciones
    const totalRating = (data.rating + comida.promedio_estrellas) * (comida.cantidad_calificaciones + 1);

    comida.usuario_califica = true;
    comida.cantidad_calificaciones += 1;
    comida.promedio_estrellas = totalRating / comida.cantidad_calificaciones;
    comida.calificacion_usuario = data.rating;

    return { comida }
}
