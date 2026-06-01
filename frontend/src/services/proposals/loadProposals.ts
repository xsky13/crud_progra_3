import type { User } from "@/types/User";
import { foods } from "../food/loadFood";

export default function loadProposals() {
    const user = JSON.parse(sessionStorage.getItem("user")) as User;
    const userProposals = foods.filter(food => !food.confirmada && food.usuario_id == user.id);
    return { proposals: userProposals };
}
