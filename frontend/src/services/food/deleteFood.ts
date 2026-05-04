import type { ActionFunctionArgs } from "react-router";
import { foods } from "./loadFood";

type FormData = {
    id: string;
};

export default async function deleteFood({
    request,
}: ActionFunctionArgs): Promise<{
    error?: { msg: string };
    ok: boolean;
}> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as FormData;

    const foodId = parseInt(data.id);

    const foodIndex = foods.findIndex((food) => food.id === foodId);

    foods.splice(foodIndex, 1);

    return { ok: true };
}
