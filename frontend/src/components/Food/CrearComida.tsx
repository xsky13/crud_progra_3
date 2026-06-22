import { PlusIcon } from "lucide-react";
import SubmitButton from "../Helpers/SubmitButton";
import { Button } from "../ui/button";
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, Dialog } from "../ui/dialog";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type createFood from "@/services/food/createFood";
import { toast } from "sonner";
import errorToast from "@/lib/errorToast";

export default function CrearComida() {
    const [open, setOpen] = useState(false);
    const fetcher = useFetcher<typeof createFood>();
    const toastId = useRef<string | number>(0);

    useEffect(() => {
        toast.dismiss(toastId.current);
        fetcher.reset();
    }, [open]);

    useEffect(() => {
        if (fetcher.data?.error?.msg) {
            toastId.current = errorToast(fetcher.data.error.msg);
        }
    }, [fetcher.data]);

    // cerrar el modal cuando no hay error al crear el coso
    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.ok) {
            setTimeout(() => setOpen(false), 0); // de alguna forma suprime el error de react
        }
    }, [fetcher.state, fetcher.data]);

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.dismiss(toastId.current);
        fetcher.submit(e.currentTarget, { method: "POST" });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"lg"} className="w-32">
                    <PlusIcon />
                    Crear
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar comida</DialogTitle>
                    <fetcher.Form
                        method="POST"
                        encType="multipart/form-data"
                        action="/createFood"
                        className="mt-3"
                        onSubmit={onSubmit}
                    >
                        <FieldGroup>
                            <Field
                                data-invalid={
                                    fetcher.data?.error
                                        ?.field == "imagen"
                                }
                            >
                                <FieldLabel htmlFor="imagen">
                                    Imagen
                                </FieldLabel>
                                <Input
                                    id="imagen"
                                    name="file"
                                    type="file"
                                    aria-invalid={
                                        fetcher.data?.error
                                            ?.field == "imagen"
                                    }
                                />
                            </Field>
                            <Field
                                data-invalid={
                                    fetcher.data?.error
                                        ?.field == "titulo"
                                }
                            >
                                <FieldLabel htmlFor="titulo">
                                    Titulo de comida
                                </FieldLabel>
                                <Input
                                    id="titulo"
                                    name="titulo"
                                    aria-invalid={
                                        fetcher.data?.error
                                            ?.field == "titulo"
                                    }
                                />
                            </Field>
                            <SubmitButton
                                className="w-full"
                                isSubmitting={
                                    fetcher.state != "idle"
                                }
                            >
                                Agregar
                            </SubmitButton>
                        </FieldGroup>
                    </fetcher.Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
