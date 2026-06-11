import { redirect } from "react-router";
import { foods } from "../food/loadFood";

export default function deleteAccount(): Response {
    sessionStorage.removeItem("user");

    foods.forEach((food) => {
        food.usuarioCalifica = false;
        delete food.calificacionUsuario;
    });

    return redirect("/login");
}
