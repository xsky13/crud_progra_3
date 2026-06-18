import type { ActionFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";

type FormData = {
    titulo: string;
    imagen: File;
};

export default async function createProposal({
    request,
}: ActionFunctionArgs): Promise<FormError> {
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


    try {
        await api.post("/Propuesta", formData);
        return { ok: true }
    } catch (error) {
        return manageRequestError(error);
    }
}
