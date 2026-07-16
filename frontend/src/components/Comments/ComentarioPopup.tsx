import { InfoIcon } from "lucide-react"
import CommentItem from "./CommentItem";
import type { Comment } from "@/types/Comment";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

export function ComentarioPopup({ comentarios, upvote, downvote }: {
	comentarios: Comment[],
	upvote: (commentId: number) => void,
	downvote: (commentId: number) => void,
}) {

	return (
		!comentarios || comentarios.length == 0 ?
			<Alert>
				<InfoIcon />
				<AlertTitle>Todavía no hay comentarios</AlertTitle>
				<AlertDescription>Se el primero en comentar!</AlertDescription>
			</Alert>
			:
			comentarios.map((comentario, i) => (
				<CommentItem
					key={i}
					comment={comentario}
					upvote={upvote}
					downvote={downvote}
				/>
			))
	)
}
