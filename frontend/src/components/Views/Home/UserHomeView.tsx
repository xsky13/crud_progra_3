import type { ComidaView } from "@/types/Comida";
import FoodCard from "../../FoodCard";
import { InfoIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "../../ui/alert";
import { Button } from "../../ui/button";
import CreateProposal from "../../Proposals/CreateProposal";

export default function UserHomeView({ comidas }: { comidas: ComidaView[] }) {
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
            <div className="fixed bottom-0 w-full flex justify-center">
                <div className="text-center py-4 w-2/12 backdrop-blur-sm mb-2 rounded-xl">
                    <CreateProposal />
                </div>
            </div>
        </div>
    );
}
