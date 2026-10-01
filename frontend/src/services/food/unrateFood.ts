import { type ActionFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";

export default async function unrateFood({ params }: ActionFunctionArgs): Promise<FormError | void> {
    const foodId = params.id ? parseInt(params.id, 10) : NaN;
    try {
        const res = await api.delete(`/Comida/${foodId}/unrate`);
        console.log(res);
    } catch (err) {
        console.log(err);
        return manageRequestError(err);
    }


    // const comida = foods.filter(food => food.id == foodId)[0];
    // if (!comida) return { error: "La comida no existe." };

    // Si el usuario no ha calificado, retornar error
    // if (!comida.usuarioCalifica) return { error: "No has calificado esta comida." };

    // Calcular la sumatoria anterior sin la calificación del usuario
    // const sumatoriaCalificacionesAnterior = comida.promedioEstrellas * comida.cantidadCalificaciones;
    // const sumatoriaCalificacionesSinUsuario = sumatoriaCalificacionesAnterior - (comida.calificacionUsuario || 0);

    // Actualizar los datos
    // comida.usuarioCalifica = false;
    // comida.cantidadCalificaciones -= 1;

    // Calcular el nuevo promedio
    // if (comida.cantidadCalificaciones > 0) {
    //     comida.promedioEstrellas = sumatoriaCalificacionesSinUsuario / comida.cantidadCalificaciones;
    // } else {
    //     comida.promedioEstrellas = 0;
    // }

    // comida.calificacionUsuario = undefined;

    // return { comida };
}
