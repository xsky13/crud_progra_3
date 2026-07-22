import api from "@/api";
import type { CommentView } from "@/types/Comment";
import type { FormError } from "@/types/FormError";
import type { ActionFunctionArgs } from "react-router";

type FormData = {
	comidaId: number;
	commentText: string;
}

export default async function createComment({ request }: ActionFunctionArgs): Promise<FormError & { newComment?: never } | { newComment: CommentView }> {
	const data = await request.json() as FormData;

	if (data.commentText.trim() == "") {
		return {
			ok: false,
			error: {
				msg: "No puede hacer un comentario vacio",
				field: "commentText",
			},
		};
	}

	try {
		const result = await api.post(`comment/${data.comidaId}`, { textoComentario: data.commentText });

		return { newComment: result.data }
	} catch (err) {
		console.log(err);
		return {
			ok: false,
			error: {
				msg: "Ocurrio un error inesperado",
				field: ""
			}
		}
	}

}
