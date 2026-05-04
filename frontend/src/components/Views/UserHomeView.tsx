import type { Comida } from "@/types/Comida";
import FoodCard from "../FoodCard";
import useUser from "@/hooks/useUser";
import { InfoIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "../ui/alert";
import { Button } from "../ui/button";

export default function UserHomeView({ comidas }: { comidas: Comida[] }) {
    const user = useUser();
    return (
        <div className="flex justify-center">
            {comidas.length != 0 ? (
                comidas.map((comida, i) => (
                    <FoodCard key={i} comida={comida} userRole={user.rol} />
                ))
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
