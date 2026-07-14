import type { FormError } from "@/types/FormError";
import type { ActionFunctionArgs } from "react-router";

type FormData = {
	comidaId: number;
	commentText: string;
}

export default async function createComment({ request }: ActionFunctionArgs): Promise<FormError> {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as FormData;

	if (data.commentText.trim() == "") {
		return {
			ok: false,
			error: {
				msg: "No puede hacer un comentario vacio",
				field: "commentText",
			},
		};
	}


}
