import type { User } from "@/types/User";
import { foods } from "../food/loadFood";

export default function loadProposals() {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) return { proposals: [] };

    const user = JSON.parse(storedUser) as User;
    const userProposals = foods.filter(food => !food.confirmada && food.userId == user.id);
    return { proposals: userProposals };
}
