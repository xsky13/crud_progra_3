import type { ActionFunctionArgs } from "react-router";
import type { FormError } from "@/types/FormError";
import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";

type FormData = {
    id: string;
};

export default async function deleteFood({
    request,
}: ActionFunctionArgs): Promise<FormError> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as FormData;

    const foodId = parseInt(data.id);

    try {
        await api.delete("/Comida/" + foodId);
        return { ok: true };
    } catch (err) {
        return manageRequestError(err);
    }
}
