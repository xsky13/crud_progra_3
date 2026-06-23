import type { ComidaView } from "@/types/Comida";
import FoodCard from "../../Food/FoodCard";
import { InfoIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../../ui/alert";
import CrearComida from "@/components/Food/CrearComida";

export default function AdminHomeView({ comidas }: { comidas: ComidaView[] }) {

    return (
        <div className="block m-auto w-10/12">
            <div className="flex justify-center flex-col">
                <h1>Panel de administracion</h1>

                <div className="mt-5">
                    <div className="mb-3 flex justify-between items-end">
                        <div>
                            <h3 className="subtitle">Comidas actuales</h3>
                            <div className="w-32 border border-primary"></div>
                        </div>
                        <CrearComida />
                    </div>

                    {comidas.length != 0 ? (
                        <div className="grid grid-cols-1 place-items-center mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                            {comidas.map((comida, i) => (
                                <FoodCard key={i} data={comida} />
                            ))}
                        </div>
                    ) : (
                        <Alert className="w-96 mt-5">
                            <InfoIcon />
                            <AlertTitle>No hay comidas</AlertTitle>
                            <AlertDescription>
                                Empiece a agregarlas!
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
