import { redirect } from "react-router";
import { foods } from "../food/loadFood";

export default function logout(): Response {
    sessionStorage.removeItem("user");
    // provisorio por como funciona el frontend mock:
    foods.forEach(food => {
        food.usuario_califica = false;
        delete food.calificacion_usuario;
    })
    return redirect("/login");
}
