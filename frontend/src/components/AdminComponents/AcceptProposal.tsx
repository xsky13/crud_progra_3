import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import errorToast from "@/lib/errorToast";
import type acceptProposal from "@/services/proposals/acceptProposal";
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

export default function AcceptProposal({ proposalId }: { proposalId: number }) {
    const [open, setOpen] = useState(false);
    const fetcherAccept = useFetcher<typeof acceptProposal>();
    const toastIdAccept = useRef<string | number>(0);

    // Cerrar diálogo después de aceptación exitosa
    useEffect(() => {
        if (fetcherAccept.state === "idle" && fetcherAccept.data?.ok) {
            setTimeout(() => setOpen(false), 0); // cambiar estado en ultimo render? elimina error de mi editor de codigo
        }
    }, [fetcherAccept.state, fetcherAccept.data]);

    useEffect(() => {
        if (fetcherAccept.data?.error?.msg) {
            toastIdAccept.current = errorToast(fetcherAccept.data.error.msg);
        }
    }, [fetcherAccept.data]);

    const handleAccept = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.dismiss(toastIdAccept.current);
        fetcherAccept.submit(
            { id: proposalId },
            {
                method: "POST",
                action: "/acceptProposal",
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <CheckIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar propuesta</DialogTitle>
                    <p>
                        ¿Está seguro que desea confirmar esta propuesta de comida? Los usuarios podrán calificarla.
                    </p>
                    <form onSubmit={handleAccept}>
                        <Button
                            className="w-full" //provisorio, a discutir
                            // className="w-full bg-green-700 text-white hover:bg-green-700/70"
                            disabled={fetcherAccept.state !== "idle"}
                        >
                            <CheckIcon />
                            Confirmar propuesta
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
