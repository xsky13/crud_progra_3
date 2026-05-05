import type { ActionFunctionArgs } from "react-router";
import { foods } from "./loadFood";

type FormData = {
    titulo: string;
    imagen: File;
};

export default async function createFood({
    request,
}: ActionFunctionArgs): Promise<{
    error?: { msg: string; field: string };
    ok: boolean;
}> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as FormData;

    if (data.titulo.trim() == "") {
        return {
            ok: false,
            error: {
                msg: "El titulo no puede estar vacio",
                field: "titulo",
            },
        };
    }

    // temporary: get food with last id:
    const biggestId = foods.reduce(
        (acc, item) => (item.id > acc ? item.id : acc),
        1,
    );

    foods.push({
        id: biggestId + 1,
        titulo: data.titulo,
        img_url: URL.createObjectURL(data.imagen),
        confirmada: true,
        usuario_id: 1,
        cantidad_calificaciones: 0,
        promedio_estrellas: 0,
    });

    return { ok: true };
}
