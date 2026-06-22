import FoodCard from "@/components/Food/FoodCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import type { ComidaView } from "@/types/Comida";
import { InfoIcon } from "lucide-react";

export default function UserPropuestaView({ propuestas }: { propuestas: ComidaView[] }) {
    return (
        <div className="block m-auto w-10/12 md:w-8/12">
            <h1 className="text-center md:text-left">Mis propuestas</h1>
            <div className="mt-3">
                {
                    propuestas.length ?
                        <div className="grid justify-center md:grid-cols-2 xl:grid-cols-3 gap-x-4 min-[1798px]:gap-x-0 gap-y-5 min-[1798px]:gap-y-10">
                            {
                                propuestas.map((propuesta, i) => (
                                    <FoodCard key={i} data={propuesta} />
                                ))
                            }
                        </div>
                        :
                        <Alert className="w-96">
                            <InfoIcon />
                            <AlertTitle>Todavía no tiene propuestas</AlertTitle>
                            <AlertDescription>Empiece a agregarlas desde la pagina principal!</AlertDescription>
                        </Alert>
                }
            </div>
        </div>
    );
}
