import { Button } from "@/components/ui/button";
import {
    Card,
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
import { PencilIcon, TrashIcon } from "lucide-react";
import { useFetcher } from "react-router";
import type deleteFood from "@/services/food/deleteFood";
import type updateFood from "@/services/food/updateFood";
import { useRef, useEffect, useState } from "react";
import errorToast from "@/lib/errorToast";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/Helpers/SubmitButton";

export default function FoodCard({
    comida,
    userRole,
}: {
    comida: Comida;
    userRole: UserRole;
}) {
    const fetcherDelete = useFetcher<typeof deleteFood>();
    const fetcherUpdate = useFetcher<typeof updateFood>();
    const toastIdDelete = useRef<string | number>(0);
    const toastIdUpdate = useRef<string | number>(0);
    const [openEdit, setOpenEdit] = useState(false);

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
        if (
            fetcherUpdate.state === "idle" &&
            fetcherUpdate.data?.ok
        ) {
            setOpenEdit(false);
        }
    }, [fetcherUpdate.state, fetcherUpdate.data]);

    const handleDelete = () => {
        const formData = new FormData();
        formData.append("id", comida.id.toString());
        fetcherDelete.submit(formData, { method: "POST", action: "/deleteFood" });
    };

    const onSubmitEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetcherUpdate.submit(e.currentTarget, { method: "POST", action: "/updateFood" });
    };

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
                        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                            <DialogTrigger asChild>
                                <Button variant="secondary">
                                    <PencilIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Editar comida</DialogTitle>
                                    <form
                                        onSubmit={onSubmitEdit}
                                        className="mt-3"
                                    >
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={comida.id}
                                        />
                                        <FieldGroup>
                                            <Field
                                                data-invalid={
                                                    fetcherUpdate.data?.error
                                                        ?.field == "imagen"
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
                                                        fetcherUpdate.data
                                                            ?.error
                                                            ?.field == "imagen"
                                                    }
                                                />
                                            </Field>
                                            <Field
                                                data-invalid={
                                                    fetcherUpdate.data?.error
                                                        ?.field == "titulo"
                                                }
                                            >
                                                <FieldLabel htmlFor="titulo">
                                                    Titulo de comida
                                                </FieldLabel>
                                                <Input
                                                    id="titulo"
                                                    name="titulo"
                                                    defaultValue={comida.titulo}
                                                    aria-invalid={
                                                        fetcherUpdate.data
                                                            ?.error
                                                            ?.field == "titulo"
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
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={fetcherDelete.state !== "idle"}
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
