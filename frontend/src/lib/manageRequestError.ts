import type { BackendReturnError } from "@/types/BackendReturnError";
import type { FormError } from "@/types/FormError";
import type { AxiosError } from "axios";

export default function manageRequestError(error: unknown): FormError {
    const axiosError = error as AxiosError<{ error: string }>;

    if (axiosError.response) {
        const fullError = axiosError.response.data as BackendReturnError;
        return { error: { msg: fullError.error, field: fullError.field ?? "" }}
    }
    return { error: { msg: "Ocurrio un error. Por favor, intente de nuevo o contactese con un administrador.", field: "" }}
}
