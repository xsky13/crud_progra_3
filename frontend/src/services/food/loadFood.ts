import api from "@/api";
import type { ComidaView } from "@/types/Comida";
export const foods: ComidaView[] = [
    {
        id: 1,
        titulo: "Fideos",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Fideos_n%C2%BA_0_%28squared%29.jpg/960px-Fideos_n%C2%BA_0_%28squared%29.jpg",
        promedioEstrellas: 0,
        cantidadCalificaciones: 0,
        confirmada: true,
        userId: 1,
        usuarioCalifica: false,
        // calificacionUsuario: 3,
    },
    {
        id: 2,
        titulo: "Porotos",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Porotos_con_riendas_%28con_carne%29.jpg",
        promedioEstrellas: 4.5,
        cantidadCalificaciones: 1,
        confirmada: true,
        userId: 1,
        usuarioCalifica: false,
        // calificacionUsuario: 3,
    },
    {
        id: 3,
        titulo: "Pizza",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
        promedioEstrellas: 0,
        cantidadCalificaciones: 0,
        confirmada: true,
        userId: 1,
        usuarioCalifica: false,
    },
    {
        id: 4,
        titulo: "Ensalada César",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        promedioEstrellas: 0,
        cantidadCalificaciones: 0,
        confirmada: false,
        userId: 1,
        usuarioCalifica: false,
    },
    {
        id: 5,
        titulo: "Tacos",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4a/BBQ_Mahi-Mahi_Tacos.jpg", // la otra foto no existia
        promedioEstrellas: 0,
        cantidadCalificaciones: 0,
        confirmada: false,
        userId: 1,
        usuarioCalifica: false,
    },
];
export default async function loadFood(): Promise<{ comidas: ComidaView[] }> {
    const comidas = await api.get("/Comida")
        .then(res => res.data)
        .catch(err => console.log(err));
    // console.log(comidas);

    return { comidas };
}
