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
    if (!comida.usuarioCalifica) return { error: "No has calificado esta comida." };

    // Calcular la sumatoria anterior sin la calificación del usuario
    const sumatoriaCalificacionesAnterior = comida.promedioEstrellas * comida.cantidadCalificaciones;
    const sumatoriaCalificacionesSinUsuario = sumatoriaCalificacionesAnterior - (comida.calificacionUsuario || 0);

    // Actualizar los datos
    comida.usuarioCalifica = false;
    comida.cantidadCalificaciones -= 1;

    // Calcular el nuevo promedio
    if (comida.cantidadCalificaciones > 0) {
        comida.promedioEstrellas = sumatoriaCalificacionesSinUsuario / comida.cantidadCalificaciones;
    } else {
        comida.promedioEstrellas = 0;
    }

    comida.calificacionUsuario = undefined;

    return { comida };
}
