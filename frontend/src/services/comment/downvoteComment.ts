import api from "@/api";
import manageRequestError from "@/lib/manageRequestError";
import type { FormError } from "@/types/FormError";
import type { ActionFunctionArgs } from "react-router";

export default async function downvoteComment({ params }: ActionFunctionArgs): Promise<FormError> {
	const commentId = params.id;

	try {
        await api.post("/Comment/" + commentId + "/downvote");
        return { ok: true };
    } catch (err) {
        return manageRequestError(err, Number(commentId));
    }
}
