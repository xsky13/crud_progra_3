import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";
import type { ActionFunctionArgs } from "react-router";

export default async function deleteComment({ params }: ActionFunctionArgs): Promise<FormError> {
	const commentId = params.id;

	try {
        await api.delete("/Comment/" + commentId);
        return { ok: true };
    } catch (err) {
        return manageRequestError(err, Number(commentId)); // commentId will be returned in field prop
    }
}
