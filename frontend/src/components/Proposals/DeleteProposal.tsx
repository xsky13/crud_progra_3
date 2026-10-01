import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import errorToast from "@/lib/errorToast";
import type deleteProposal from "@/services/proposals/deleteProposal";
import { useRef, useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import { Dialog } from "../ui/dialog";
import {
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

export default function DeleteProposal({ proposalId }: { proposalId: number }) {
    const [open, setOpen] = useState(false);
    const fetcherDelete = useFetcher<typeof deleteProposal>();
    const toastIdDelete = useRef<string | number>(0);

    // Cerrar diálogo después de eliminación exitosa
    useEffect(() => {
        if (fetcherDelete.state === "idle" && fetcherDelete.data?.ok) {
            setTimeout(() => setOpen(false), 0);
            toast.success("Se elimino la propuesta");
        }
    }, [fetcherDelete.state, fetcherDelete.data]);

    useEffect(() => {
        if (fetcherDelete.data?.error?.msg) {
            toastIdDelete.current = errorToast(fetcherDelete.data.error.msg);
        }
    }, [fetcherDelete.data]);

    const handleDelete = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.dismiss(toastIdDelete.current);
        fetcherDelete.submit(
            {},
            {
                method: "DELETE",
                action: "/deleteProposal/" + proposalId,
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost-destructive">
                    <TrashIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Alerta!</DialogTitle>
                    <p>
                        ¿Está seguro que desea eliminar esta propuesta? Esta acción es irreversible!
                    </p>
                    <form onSubmit={handleDelete}>
                        <Button
                            type="submit"
                            variant="destructive"
                            className="w-full bg-red-700 text-white hover:bg-red-700/70"
                            disabled={fetcherDelete.state !== "idle"}
                        >
                            <TrashIcon />
                            Eliminar
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
