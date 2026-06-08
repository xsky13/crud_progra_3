import { redirect } from "react-router";
import { foods } from "../food/loadFood";

export default function deleteAccount(): Response {
    sessionStorage.removeItem("user");

    foods.forEach((food) => {
        food.usuario_califica = false;
        delete food.calificacion_usuario;
    });

    return redirect("/login");
}
