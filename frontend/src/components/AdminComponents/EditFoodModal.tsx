import type { Comida } from "@/types/Comida";
import SubmitButton from "../Helpers/SubmitButton";
import { PencilIcon } from "lucide-react";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import {
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type updateFood from "@/services/food/updateFood";
import errorToast from "@/lib/errorToast";

export default function EditFoodModal({ comida }: { comida: Comida }) {
    const toastIdUpdate = useRef<string | number>(0);
    const [openEdit, setOpenEdit] = useState(false);
    const fetcherUpdate = useFetcher<typeof updateFood>();

    // Cerrar diálogo después de actualización exitosa
    useEffect(() => {
        if (fetcherUpdate.state === "idle" && fetcherUpdate.data?.ok) {
            setOpenEdit(false);
        }
    }, [fetcherUpdate.state, fetcherUpdate.data]);

    useEffect(() => {
        if (fetcherUpdate.data?.error?.msg) {
            toastIdUpdate.current = errorToast(fetcherUpdate.data.error.msg);
        }
    }, [fetcherUpdate.data]);

    const onSubmitEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("id", comida.id.toString());
        toast.dismiss(toastIdUpdate.current);
        fetcherUpdate.submit(formData, {
            method: "POST",
            action: "/updateFood",
            encType: "multipart/form-data",
        });
    };

    return (
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <PencilIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar comida</DialogTitle>
                    <form
                        onSubmit={onSubmitEdit}
                        className="mt-3"
                        encType="multipart/form-data"
                    >
                        <FieldGroup>
                            <Field
                                data-invalid={
                                    fetcherUpdate.data?.error?.field == "imagen"
                                }
                            >
                                <FieldLabel htmlFor="imagen">Imagen</FieldLabel>
                                <Input
                                    id="imagen"
                                    name="imagen"
                                    type="file"
                                    aria-invalid={
                                        fetcherUpdate.data?.error?.field ==
                                        "imagen"
                                    }
                                />
                            </Field>
                            <Field
                                data-invalid={
                                    fetcherUpdate.data?.error?.field == "titulo"
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
                                        fetcherUpdate.data?.error?.field ==
                                        "titulo"
                                    }
                                />
                            </Field>
                            <SubmitButton
                                className="w-full"
                                isSubmitting={fetcherUpdate.state != "idle"}
                            >
                                Guardar cambios
                            </SubmitButton>
                        </FieldGroup>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
