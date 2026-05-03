import type { Comida } from "@/types/Comida";
import FoodCard from "../FoodCard";
import useUser from "@/hooks/useUser";

export default function UserHomeView({ comidas }: { comidas: Comida[] }) {
    const user = useUser();
    return (
        <div className="block m-auto w-8/12">
            <div className="flex justify-center flex-col">
                {comidas.length != 0 && (
                    <div className="flex gap-5">
                        {comidas.map((comida, i) => (
                            <FoodCard
                                key={i}
                                comida={comida}
                                userRole={user.rol}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
