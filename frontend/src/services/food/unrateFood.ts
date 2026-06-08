import type { ComidaView } from "@/types/Comida";
import { foods } from "./loadFood";
import type { ActionFunctionArgs } from "react-router";

export default async function unrateFood({ params }: ActionFunctionArgs): Promise<{
    comida?: ComidaView,
    error?: string
}> {
    const foodId = params.id ? parseInt(params.id, 10) : NaN;
    const comida = foods.filter(food => food.id == foodId)[0];
    if (!comida) return { error: "La comida no existe." };

    // Si el usuario no ha calificado, retornar error
    if (!comida.usuario_califica) return { error: "No has calificado esta comida." };

    // Calcular la sumatoria anterior sin la calificación del usuario
    const sumatoriaCalificacionesAnterior = comida.promedio_estrellas * comida.cantidad_calificaciones;
    const sumatoriaCalificacionesSinUsuario = sumatoriaCalificacionesAnterior - (comida.calificacion_usuario || 0);

    // Actualizar los datos
    comida.usuario_califica = false;
    comida.cantidad_calificaciones -= 1;

    // Calcular el nuevo promedio
    if (comida.cantidad_calificaciones > 0) {
        comida.promedio_estrellas = sumatoriaCalificacionesSinUsuario / comida.cantidad_calificaciones;
    } else {
        comida.promedio_estrellas = 0;
    }

    comida.calificacion_usuario = undefined;

    return { comida };
}
