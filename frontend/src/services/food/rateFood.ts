import type { ComidaView } from "@/types/Comida";
import { foods } from "./loadFood";
import type { ActionFunctionArgs } from "react-router";

export default async function rateFood({ request, params }: ActionFunctionArgs): Promise<{
    comida?: ComidaView,
    error?: string
}> {
    const data: { rating: number } = await request.json();

    const comida = foods.filter(food => food.id == parseInt(params.id))[0];
    if (!comida) return { error: "La comida no existe." };

    comida.usuario_califica = true;
    comida.calificacion_usuario = data.rating;

    return { comida }
}
