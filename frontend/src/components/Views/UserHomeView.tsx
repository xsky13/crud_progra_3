import type { Comida } from "@/types/Comida";
import FoodCard from "../FoodCard";
import { InfoIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "../ui/alert";
import { Button } from "../ui/button";

export default function UserHomeView({ comidas }: { comidas: Comida[] }) {
    return (
        <div className="flex gap-10 items-center flex-col">
            <div>
                <h3 className="subtitle">Comidas actuales</h3>
                <div className="w-32 border border-primary"></div>
            </div>
            {comidas.length != 0 ? (
                comidas.map((comida, i) => <FoodCard key={i} comida={comida} />)
            ) : (
                <Alert className="w-96">
                    <InfoIcon />
                    <AlertTitle>Todavía no hay comidas</AlertTitle>
                    <AlertDescription>Empiece a agregarlas!</AlertDescription>
                    <AlertAction>
                        <Button variant="secondary">Agregar</Button>
                    </AlertAction>
                </Alert>
            )}
        </div>
    );
}
