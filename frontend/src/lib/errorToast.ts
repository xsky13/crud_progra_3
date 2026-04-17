import { toast } from "sonner";

export default function errorToast(error: string, duration: number = Infinity) {
    return toast.error("Error", {
        description: error,
        duration: duration,
        classNames: {
            toast: "!bg-red-200 !text-red-800 !border-none !shadow-red-500/50",
            description: "!text-red-800",
        },
    });
}
