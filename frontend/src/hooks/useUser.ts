import type { User } from "@/types/User";
import { useRouteLoaderData } from "react-router";

const useUser = () => {
    const data = useRouteLoaderData("root") as { user: User | null };
    return data?.user ?? null;
};

export default useUser;
