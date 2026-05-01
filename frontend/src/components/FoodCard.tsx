import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Comida } from "@/types/Comida";
import { UserRole } from "@/types/User";
import { PencilIcon, TrashIcon } from "lucide-react";

export default function FoodCard({
    comida,
    userRole,
    remove,
}: {
    comida: Comida;
    userRole: UserRole;
    remove: (id: number) => void;
}) {
    return (
        <Card className=" w-full max-w-sm pt-0">
            <img
                src={comida.img_url}
                alt="Event cover"
                className="aspect-video w-full object-cover"
            />
            <CardHeader className="flex justify-between items-center">
                <CardTitle>{comida.titulo}</CardTitle>
                {userRole == UserRole.Admin && (
                    <div className="flex gap-2">
                        <Button variant="secondary">
                            <PencilIcon />
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => remove(comida.id)}
                        >
                            <TrashIcon />
                        </Button>
                    </div>
                )}
            </CardHeader>
            {userRole == UserRole.Usuario && (
                <>
                    <CardDescription></CardDescription>
                    <CardFooter>
                        <Button className="w-full" variant="outline">
                            Ver comentarios
                        </Button>
                    </CardFooter>
                </>
            )}
        </Card>
    );
}
