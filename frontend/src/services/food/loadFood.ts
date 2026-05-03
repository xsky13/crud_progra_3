import type { Comida } from "@/types/Comida";

export default async function loadFood(): Promise<{ comidas: Comida[] }> {
    const food = [
        {
            id: 1,
            titulo: "Fideos",
            img_url:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Fideos_n%C2%BA_0_%28squared%29.jpg/960px-Fideos_n%C2%BA_0_%28squared%29.jpg",
            confirmada: true,
            usuario_id: 1,
        },
    ];

    return { comidas: food };
}
