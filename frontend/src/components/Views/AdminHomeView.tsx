import type { Comida } from "@/types/Comida";
import FoodCard from "../FoodCard";
import { UserRole } from "@/types/User";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useFetcher } from "react-router";
import SubmitButton from "../Helpers/SubmitButton";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import errorToast from "@/lib/errorToast";
import type createFood from "@/services/food/createFood";
import { toast } from "sonner";

export default function AdminHomeView({ comidas }: { comidas: Comida[] }) {
    const fetcher = useFetcher<typeof createFood>();
    const toastId = useRef<string | number>(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (fetcher.data?.error?.msg) {
            toastId.current = errorToast(fetcher.data.error.msg);
        }
    }, [fetcher.data]);

    // cerrar el modal cuando no hay error al crear el coso
    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.ok) {
            setOpen(false);
        }
    }, [fetcher.state, fetcher.data]);

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.dismiss(toastId.current);
        fetcher.submit(e.currentTarget, { method: "POST" });
    };

    return (
        <div className="block m-auto w-8/12">
            <div className="flex justify-center flex-col">
                <h1>Panel administracion</h1>

                <div className="mt-5">
                    <div className="flex justify-between items-center">
                        <h3 className="subtitle mb-3">Comidas actuales</h3>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusIcon />
                                    Crear
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Agregar comida</DialogTitle>
                                    <fetcher.Form
                                        method="POST"
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
                                                    name="imagen"
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
                    </div>

                    {comidas.length != 0 && (
                        <div className="flex gap-5">
                            {comidas.map((comida, i) => (
                                <FoodCard
                                    key={i}
                                    comida={comida}
                                    userRole={UserRole.Admin}
                                    remove={() => {}}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
