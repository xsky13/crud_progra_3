import type { ComidaView } from "@/types/Comida";
export const foods: ComidaView[] = [
    {
        id: 1,
        titulo: "Fideos",
        img_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Fideos_n%C2%BA_0_%28squared%29.jpg/960px-Fideos_n%C2%BA_0_%28squared%29.jpg",
        promedio_estrellas: 0,
        cantidad_calificaciones: 0,
        confirmada: true,
        usuario_id: 1,
        usuario_califica: false,
        // calificacion_usuario: 3,
    },
];
export default async function loadFood(): Promise<{ comidas: ComidaView[] }> {
    return { comidas: foods };
}
