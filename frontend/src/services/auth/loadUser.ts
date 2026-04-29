import type { User } from "@/types/User";

export default async function loadUser(): Promise<{ user: User } | null> {
    // obtener token
    const storedUser = sessionStorage.getItem("user") 
    if (!storedUser) return null; // usuario no existe
    
    // hacer llamada a backend
    // retornar usuario
    const user = JSON.parse(storedUser) as User;
    return { user };
}
