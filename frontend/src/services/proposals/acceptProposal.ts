import type { ActionFunctionArgs } from "react-router";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";
import api from "@/api";

export default async function acceptProposal({
    request,
}: ActionFunctionArgs): Promise<FormError> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as { id: string };

    const proposalId = parseInt(data.id);

    try {
        await api.post(`/Propuesta/${proposalId}/accept`);
        return { ok: true };
    } catch (error) {
        return manageRequestError(error)
    }
}
