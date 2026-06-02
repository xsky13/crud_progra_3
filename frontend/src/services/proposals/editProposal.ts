import type { ActionFunctionArgs } from "react-router";
import { foods } from "../food/loadFood";


export default async function editProposal({ request, params }: ActionFunctionArgs): Promise<{ ok: boolean, error?: { msg: string, field: string } }> {
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

    const foodIdx = foods.findIndex(food => food.id == proposalId);
    foods[foodIdx].titulo = data.titulo;

    return { ok: true };
}
