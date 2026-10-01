import type { ActionFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";

export default async function rateFood({ request, params }: ActionFunctionArgs): Promise<void | FormError> {
    const data = await request.json();

    const foodId = params.id ? parseInt(params.id, 10) : NaN;
    // const comida = foods.filter(food => food.id == foodId)[0];
    // if (!comida) return { error: "La comida no existe." };

    // La formula anterior no funciono por el retraso mental que manejo. Ahora sacamos la sumatoria de calificaciones despejando,
    // y despues le agregamos la nueva calificacion, dividimos por la cantidad de calificaciones mas 1, y obtenemos el nuevo promedio.
    // const sumatoriaCalificacionesAnterior = comida.promedioEstrellas * comida.cantidadCalificaciones;

    // comida.usuarioCalifica = true;
    // comida.promedioEstrellas = (sumatoriaCalificacionesAnterior + data.rating) / (comida.cantidadCalificaciones + 1);
    // comida.cantidadCalificaciones += 1;
    // comida.calificacionUsuario = data.rating;

    try {
        const res = await api.post(`/Comida/${foodId}/rate`, data);
        console.log(res);
        // return {comida}
    } catch (err) {
        console.log(err);
        return manageRequestError(err);
    }
}
