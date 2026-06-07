import { foods } from "../food/loadFood";

export default function loadAdminProposals() {
    const adminProposals = foods.filter(food => !food.confirmada);
    return { proposals: adminProposals };
}
