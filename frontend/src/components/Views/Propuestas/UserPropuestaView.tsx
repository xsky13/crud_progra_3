import FoodCard from "@/components/FoodCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import type { ComidaView } from "@/types/Comida";
import { InfoIcon } from "lucide-react";

export default function UserPropuestaView({ propuestas }: { propuestas: ComidaView[] }) {
    return (
        <div className="block m-auto w-8/12">
            <h1>Mis propuestas</h1>
            <div className="mt-3">
                {
                    propuestas.length ?
                        propuestas.map((propuesta, i) => (
                            <FoodCard key={i} comida={propuesta} />
                        ))
                        :
                        <Alert className="w-96">
                            <InfoIcon />
                            <AlertTitle>Todavía no hay comidas</AlertTitle>
                            <AlertDescription>Empiece a agregarlas desde la pagina principal!</AlertDescription>
                        </Alert>
                }
            </div>
        </div>
    );
}
