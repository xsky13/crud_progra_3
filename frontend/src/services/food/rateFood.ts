import type { ComidaView } from "@/types/Comida";
import { foods } from "./loadFood";
import type { ActionFunctionArgs } from "react-router";

export default async function rateFood({ request, params }: ActionFunctionArgs): Promise<{
    comida?: ComidaView,
    error?: string
}> {
    const data = await request.json();

    const foodId = params.id ? parseInt(params.id, 10) : NaN;
    const comida = foods.filter(food => food.id == foodId)[0];
    if (!comida) return { error: "La comida no existe." };

    // La formula anterior no funciono por el retraso mental que manejo. Ahora sacamos la sumatoria de calificaciones despejando,
    // y despues le agregamos la nueva calificacion, dividimos por la cantidad de calificaciones mas 1, y obtenemos el nuevo promedio.
    const sumatoriaCalificacionesAnterior = comida.promedio_estrellas * comida.cantidad_calificaciones;

    comida.usuario_califica = true;
    comida.promedio_estrellas = (sumatoriaCalificacionesAnterior + data.rating) / (comida.cantidad_calificaciones + 1);
    comida.cantidad_calificaciones += 1;
    comida.calificacion_usuario = data.rating;

    return { comida }
}
