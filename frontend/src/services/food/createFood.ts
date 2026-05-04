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

    foods.push({
        id: 1,
        titulo: data.titulo,
        img_url: URL.createObjectURL(data.imagen),
        confirmada: true,
        usuario_id: 1,
    });

    return { ok: true };
}
