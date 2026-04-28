import { userContext } from "@/context/userContext";
import type { User } from "@/types/User";
import type { LoaderFunctionArgs } from "react-router";

export default async function loadUser({
    context,
}: LoaderFunctionArgs): Promise<{ user: User }> {
    if (context.get(userContext)) {
        return { user: context.get(userContext) };
    }

    // obtener token
    // hacer llamada a backend
    // retornar usuario

    // usuario no exite, retornar null
    return null;
}
