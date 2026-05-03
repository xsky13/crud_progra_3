import type { Comida } from "@/types/Comida";
import FoodCard from "../FoodCard";
import { UserRole } from "@/types/User";

export default function AdminHomeView({ comidas }: { comidas: Comida[] }) {
    return (
        <div className="block m-auto w-8/12">
            <div className="flex justify-center flex-col">
                <h1>Panel administracion</h1>

                <div className="mt-5">
                    <h3 className="subtitle mb-3">Comidas actuales</h3>

                    {comidas.length != 0 &&
                        comidas.map((comida, i) => (
                            <FoodCard
                                key={i}
                                comida={comida}
                                userRole={UserRole.Admin}
                                remove={() => {}}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
