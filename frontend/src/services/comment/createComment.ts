import api from "@/api";
import type { Comment } from "@/types/Comment";
import type { FormError } from "@/types/FormError";
import type { ActionFunctionArgs } from "react-router";

type FormData = {
	comidaId: number;
	commentText: string;
}

export default async function createComment({ request }: ActionFunctionArgs): Promise<FormError | { comments: Comment[] }> {
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
		await api.post(`comment/${data.comidaId}`, { textoComentario: data.commentText });

		const comments = await api.get("/comment/" + data.comidaId).then(res => res.data);

		return { comments }
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
