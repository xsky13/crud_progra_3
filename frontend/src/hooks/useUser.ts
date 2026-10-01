import type { User } from "@/types/User";
import { useRouteLoaderData } from "react-router";

const useUser = () => {
    const data = useRouteLoaderData("root") as User;
    return data ?? null;
};

export default useUser;
