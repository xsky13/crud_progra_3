import type { ActionFunctionArgs } from "react-router";
import type { FormError } from "@/types/FormError";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";

type FormData = {
    id: string;
    titulo: string;
    imagen: File;
};

export default async function updateFood({
    request,
}: ActionFunctionArgs): Promise<FormError> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as FormData;

    const foodId = parseInt(data.id);

    if (data.titulo.trim() == "") {
        return {
            ok: false,
            error: {
                msg: "El titulo no puede estar vacio",
                field: "titulo",
            },
        };
    }

    try {
        await api.put("/Comida/" + foodId, formData);
        return { ok: true };
    } catch (err) {
        return manageRequestError(err);
    }
}
