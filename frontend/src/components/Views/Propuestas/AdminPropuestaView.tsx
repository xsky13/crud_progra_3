import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import type { ComidaView } from "@/types/Comida";
import { InfoIcon } from "lucide-react";
import AcceptProposal from "../../AdminComponents/AcceptProposal";
import DeleteProposal from "../../AdminComponents/DeleteProposal";

export default function AdminPropuestaView({ propuestas }: { propuestas: ComidaView[] }) {
    return (
        <div className="block m-auto w-8/12">
            <h1>Propuestas de comidas</h1>
            <div className="mt-3 flex flex-wrap gap-4">
                {
                    propuestas.length ?
                        propuestas.map((propuesta, i) => (
                            <Card key={i} className="w-full max-w-sm pt-0">
                                <img
                                    src={propuesta.img_url}
                                    alt="Proposal cover"
                                    className="aspect-video w-full object-cover"
                                />
                                <CardHeader className="items-center">
                                    <CardTitle className="tracking-wide">{propuesta.titulo}</CardTitle>
                                    <CardAction>
                                        <div className="flex gap-2">
                                            <AcceptProposal proposalId={propuesta.id} />
                                            <DeleteProposal proposalId={propuesta.id} />
                                        </div>
                                    </CardAction>
                                </CardHeader>
                            </Card>
                        ))
                        :
                        <Alert className="w-96">
                            <InfoIcon />
                            <AlertTitle>No hay propuestas pendientes</AlertTitle>
                            <AlertDescription>Todas las propuestas han sido revisadas!</AlertDescription>
                        </Alert>
                }
            </div>
        </div>
    );
}
