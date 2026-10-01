import type { ActionFunctionArgs } from "react-router";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";

export default async function deleteProposal({
    params
}: ActionFunctionArgs): Promise<FormError> {
    const proposalId = Number(params.id);

    console.log("hello")
    try {
        await api.delete("/Propuesta/" + proposalId);
        return { ok: true }
    } catch (error) {
        return manageRequestError(error);
    }
}
