import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import errorToast from "@/lib/errorToast";
import type deleteFood from "@/services/food/deleteFood";
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

export default function DeleteFood({ comidaId }: { comidaId: number }) {
    const [open, setOpen] = useState(false);
    const fetcherDelete = useFetcher<typeof deleteFood>();
    const toastIdDelete = useRef<string | number>(0);

    // Cerrar diálogo después de eliminacion exitosa
    useEffect(() => {
        if (fetcherDelete.state === "idle" && fetcherDelete.data?.ok) {
            setOpen(false);
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
            { id: comidaId },
            {
                method: "POST",
                action: "/deleteFood",
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
                        Esta seguro que quiere eliminar esta comida? Esta accion
                        es irreversible!
                    </p>
                    <form onSubmit={handleDelete}>
                        <Button
                            variant="destructive"
                            className="w-full"
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
