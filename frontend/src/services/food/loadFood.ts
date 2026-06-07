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
    {
        id: 2,
        titulo: "Porotos",
        img_url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Porotos_con_riendas_%28con_carne%29.jpg",
        promedio_estrellas: 0,
        cantidad_calificaciones: 0,
        confirmada: false,
        usuario_id: 1,
        usuario_califica: false,
        // calificacion_usuario: 3,
    },
    {
        id: 3,
        titulo: "Pizza",
        img_url: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
        promedio_estrellas: 0,
        cantidad_calificaciones: 0,
        confirmada: false,
        usuario_id: 1,
        usuario_califica: false,
    },
    {
        id: 4,
        titulo: "Ensalada César",
        img_url: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        promedio_estrellas: 0,
        cantidad_calificaciones: 0,
        confirmada: false,
        usuario_id: 1,
        usuario_califica: false,
    },
    {
        id: 5,
        titulo: "Tacos",
        img_url: "https://upload.wikimedia.org/wikipedia/commons/7/73/Taco_salad.jpg",
        promedio_estrellas: 0,
        cantidad_calificaciones: 0,
        confirmada: false,
        usuario_id: 1,
        usuario_califica: false,
    },
];
export default async function loadFood(): Promise<{ comidas: ComidaView[] }> {
    return { comidas: foods.filter(food => food.confirmada) };
}
