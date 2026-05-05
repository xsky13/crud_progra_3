import type { Comida } from "@/types/Comida";
export const foods = [
    {
        id: 1,
        titulo: "Fideos",
        img_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Fideos_n%C2%BA_0_%28squared%29.jpg/960px-Fideos_n%C2%BA_0_%28squared%29.jpg",
        promedio_estrellas: 3,
        cantidad_calificaciones: 6,
        confirmada: true,
        usuario_id: 1,
    },
];
export default async function loadFood(): Promise<{ comidas: Comida[] }> {
    return { comidas: foods };
}
