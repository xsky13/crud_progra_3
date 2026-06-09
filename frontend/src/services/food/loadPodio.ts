import { foods } from "./loadFood";

export default async function loadPodio() {
    const sorted = foods.filter(f => f.confirmada).sort((a, b) => b.promedio_estrellas - a.promedio_estrellas);
    return sorted.slice(0, 3);
}
