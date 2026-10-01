import type { ActionFunctionArgs } from "react-router";
import manageRequestError from "@/lib/manageRequestError";
import api from "@/api";
import type { FormError } from "@/types/FormError";


export default async function editProposal({ request, params }: ActionFunctionArgs): Promise<FormError> {
    const proposalId = Number(params.id);

    const formData = await request.formData();
    const data = Object.fromEntries(formData) as { titulo: string };

    if (data.titulo.trim() == "") {
        return {
            ok: false, error: {
                msg: "El titulo no puede estar vacio",
                field: "titulo",
            }
        };
    }

    try {
        await api.put("/Propuesta/" + proposalId, formData);
        return { ok: true }
    } catch (error) {
        return manageRequestError(error);
    }
}
