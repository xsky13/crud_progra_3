import { PencilIcon } from "lucide-react";
import SubmitButton from "../Helpers/SubmitButton";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type editProposal from "@/services/proposals/editProposal";
import { toast } from "sonner";
import errorToast from "@/lib/errorToast";

export default function EditProposal({ comidaId, comidaTitle }: { comidaId: number, comidaTitle: string }) {
    const [openEdit, setOpenEdit] = useState(false);
    const fetcherUpdate = useFetcher<typeof editProposal>();
    const toastId = useRef<string | number>(0)

    useEffect(() => {
        toast.dismiss(toastId.current);
        fetcherUpdate.reset();
    }, [openEdit]);


    useEffect(() => {
        if (!fetcherUpdate.data?.ok && fetcherUpdate.data?.error) {
            toastId.current = errorToast(fetcherUpdate.data.error.msg)
        }
    }, [fetcherUpdate.data]);


    useEffect(() => {
        if (fetcherUpdate.state == "idle" && fetcherUpdate.data?.ok) {
            setTimeout(() => setOpenEdit(false), 0);
        }
    }, [fetcherUpdate])


    const onSubmitEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.dismiss(toastId.current);
        fetcherUpdate.submit(e.currentTarget)
    }
    return (
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <PencilIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar propuesta</DialogTitle>
                    <fetcherUpdate.Form
                        onSubmit={onSubmitEdit}
                        className="mt-3"
                        action={`/editProposal/${comidaId}`}
                        method="POST"
                    >
                        <FieldGroup>
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
                                    defaultValue={comidaTitle}
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
                    </fetcherUpdate.Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
