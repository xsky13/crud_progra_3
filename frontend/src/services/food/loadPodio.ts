import type { LoaderFunctionArgs } from "react-router";
import { foods } from "./loadFood";

export default async function loadPodio({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const order = url.searchParams.get("order") ?? "desc";

    await fetch("https://jsonplaceholder.typicode.com/todos/1");


    let sorted = foods.filter(f => f.confirmada).sort((a, b) => b.promedioEstrellas - a.promedioEstrellas);
    if (order == "asc")
        sorted = foods.filter(f => f.confirmada).sort((a, b) => a.promedioEstrellas - b.promedioEstrellas);

    return sorted.slice(0, 3);
}
