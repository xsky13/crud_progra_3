import type { ActionFunctionArgs } from "react-router";
import { foods } from "./loadFood";

type FormData = {
    id: string;
    titulo: string;
    imagen: File;
};

export default async function updateFood({
    request,
}: ActionFunctionArgs): Promise<{
    error?: { msg: string; field: string };
    ok: boolean;
}> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as FormData;

    const foodId = parseInt(data.id);

    if (isNaN(foodId)) {
        return {
            ok: false,
            error: {
                msg: "ID de comida inválido",
                field: "id",
            },
        };
    }

    if (data.titulo.trim() == "") {
        return {
            ok: false,
            error: {
                msg: "El titulo no puede estar vacio",
                field: "titulo",
            },
        };
    }

    const foodIndex = foods.findIndex((food) => food.id === foodId);

    // rapido solo para las pruebas:
    foods[foodIndex].titulo = data.titulo;
    if (data.imagen.size != 0)
        foods[foodIndex].img_url = URL.createObjectURL(data.imagen);

    // foods[foodIndex] = {
    //     ...foods[foodIndex],
    //     titulo: data.titulo,
    //     img_url: data.imagen,
    // };

    return { ok: true };
}
