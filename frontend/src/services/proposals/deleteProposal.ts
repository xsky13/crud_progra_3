import type { ActionFunctionArgs } from "react-router";
import { foods } from "../food/loadFood";

type FormData = {
    id: string;
};

export default async function deleteProposal({
    request,
}: ActionFunctionArgs): Promise<{
    error?: { msg: string };
    ok: boolean;
}> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as FormData;

    const proposalId = parseInt(data.id);

    const foodIndex = foods.findIndex((food) => food.id === proposalId);

    if (foodIndex === -1) {
        return {
            ok: false,
            error: { msg: "Propuesta no encontrada" },
        };
    }

    foods.splice(foodIndex, 1);

    return { ok: true };
}
