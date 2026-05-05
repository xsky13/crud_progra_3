import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { Comida } from "@/types/Comida";
import { UserRole } from "@/types/User";
import { PencilIcon, StarIcon, TrashIcon } from "lucide-react";
import { useFetcher } from "react-router";
import type deleteFood from "@/services/food/deleteFood";
import type updateFood from "@/services/food/updateFood";
import { useRef, useEffect, useState } from "react";
import errorToast from "@/lib/errorToast";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/Helpers/SubmitButton";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";

const PromedioEstrellas = ({
    promedio_estrellas,
    cantidad_calificaciones,
    start,
}: {
    promedio_estrellas: number;
    cantidad_calificaciones: number;
    start?: boolean;
}) => {
    return (
        <div
            className={`inline-flex flex-col items-${start ? "start" : "end"}`}
        >
            <div className="flex gap-1 items-center font-bold text-black">
                <StarIcon size={17} fill="black" /> {promedio_estrellas}/5
            </div>
            <div className="text-xs text-muted-foreground">
                {cantidad_calificaciones} calificaciones
            </div>
        </div>
    );
};

export default function FoodCard({ comida }: { comida: Comida }) {
    const fetcherDelete = useFetcher<typeof deleteFood>();
    const fetcherUpdate = useFetcher<typeof updateFood>();
    const toastIdDelete = useRef<string | number>(0);
    const toastIdUpdate = useRef<string | number>(0);
    const [openEdit, setOpenEdit] = useState(false);

    const currentUser = useUser();
    if (!currentUser) return null;

    useEffect(() => {
        if (fetcherDelete.data?.error?.msg) {
            toastIdDelete.current = errorToast(fetcherDelete.data.error.msg);
        }
    }, [fetcherDelete.data]);

    useEffect(() => {
        if (fetcherUpdate.data?.error?.msg) {
            toastIdUpdate.current = errorToast(fetcherUpdate.data.error.msg);
        }
    }, [fetcherUpdate.data]);

    // Cerrar diálogo después de actualización exitosa
    useEffect(() => {
        if (fetcherUpdate.state === "idle" && fetcherUpdate.data?.ok) {
            setOpenEdit(false);
        }
    }, [fetcherUpdate.state, fetcherUpdate.data]);

    const handleDelete = () => {
        const formData = new FormData();
        formData.append("id", comida.id.toString());

        toast.dismiss(toastIdDelete.current);
        fetcherDelete.submit(formData, {
            method: "POST",
            action: "/deleteFood",
        });
    };

    const onSubmitEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.dismiss(toastIdUpdate.current);
        fetcherUpdate.submit(e.currentTarget, {
            method: "POST",
            action: "/updateFood",
        });
    };

    return (
        <Card className="w-full max-w-sm pt-0">
            <img
                src={comida.img_url}
                alt="Event cover"
                className="aspect-video w-full object-cover"
            />
            <CardHeader>
                <CardTitle className="font-bold border-black w-fit">
                    {comida.titulo}
                </CardTitle>
                {currentUser.rol == UserRole.Admin ? (
                    <>
                        <CardAction>
                            <div className="flex">
                                <Dialog
                                    open={openEdit}
                                    onOpenChange={setOpenEdit}
                                >
                                    <DialogTrigger asChild>
                                        <Button variant="ghost">
                                            <PencilIcon />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Editar comida
                                            </DialogTitle>
                                            <form
                                                onSubmit={onSubmitEdit}
                                                className="mt-3"
                                                encType="multipart/form-data"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={comida.id}
                                                />
                                                <FieldGroup>
                                                    <Field
                                                        data-invalid={
                                                            fetcherUpdate.data
                                                                ?.error
                                                                ?.field ==
                                                            "imagen"
                                                        }
                                                    >
                                                        <FieldLabel htmlFor="imagen">
                                                            Imagen
                                                        </FieldLabel>
                                                        <Input
                                                            id="imagen"
                                                            name="imagen"
                                                            type="file"
                                                            aria-invalid={
                                                                fetcherUpdate
                                                                    .data?.error
                                                                    ?.field ==
                                                                "imagen"
                                                            }
                                                        />
                                                    </Field>
                                                    <Field
                                                        data-invalid={
                                                            fetcherUpdate.data
                                                                ?.error
                                                                ?.field ==
                                                            "titulo"
                                                        }
                                                    >
                                                        <FieldLabel htmlFor="titulo">
                                                            Titulo de comida
                                                        </FieldLabel>
                                                        <Input
                                                            id="titulo"
                                                            name="titulo"
                                                            defaultValue={
                                                                comida.titulo
                                                            }
                                                            aria-invalid={
                                                                fetcherUpdate
                                                                    .data?.error
                                                                    ?.field ==
                                                                "titulo"
                                                            }
                                                        />
                                                    </Field>
                                                    <SubmitButton
                                                        className="w-full"
                                                        isSubmitting={
                                                            fetcherUpdate.state !=
                                                            "idle"
                                                        }
                                                    >
                                                        Guardar cambios
                                                    </SubmitButton>
                                                </FieldGroup>
                                            </form>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    variant="ghost-destructive"
                                    onClick={handleDelete}
                                    disabled={fetcherDelete.state !== "idle"}
                                >
                                    <TrashIcon />
                                </Button>
                            </div>
                        </CardAction>
                        <CardDescription className="my-2 w-full">
                            <PromedioEstrellas
                                start={true}
                                cantidad_calificaciones={
                                    comida.cantidad_calificaciones
                                }
                                promedio_estrellas={comida.promedio_estrellas}
                            />
                        </CardDescription>
                    </>
                ) : (
                    <>
                        <CardAction>
                            <PromedioEstrellas
                                cantidad_calificaciones={
                                    comida.cantidad_calificaciones
                                }
                                promedio_estrellas={comida.promedio_estrellas}
                            />
                        </CardAction>
                        <CardDescription className="mt-2">
                            <div className="flex gap-2 items-center text-amber-400">
                                <StarIcon size={20} />
                                <StarIcon size={20} />
                                <StarIcon size={20} />
                                <StarIcon size={20} />
                                <StarIcon size={20} />
                            </div>
                        </CardDescription>
                    </>
                )}
            </CardHeader>
            {currentUser.rol == UserRole.Usuario && (
                <>
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
