import type { User } from "@/types/User";
import { createContext } from "react-router";

export const userContext = createContext<User>(null);
