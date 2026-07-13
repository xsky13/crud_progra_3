import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function CommentItem(props: {
	texto: string,
	votos: number,
	commentId: number,
	nombreUsuario: string,
	fecha: string,
	upvote: (commentId: number) => void,
	downvote: (commentId: number) => void,
}) {
	return (
		<div>
			<div className="flex items-start gap-3">
				<div className="flex items-center flex-col">
					<ChevronUpIcon
						className="cursor-pointer"
						size={20}
						onClick={() => props.upvote(props.commentId)}
					/>
					<span className="text-xs">{props.votos}</span>
					<ChevronDownIcon
						className="cursor-pointer"
						size={20}
						onClick={() => props.downvote(props.commentId)}
					/>
				</div>
				{props.texto}
			</div>
			<div className="float-right text-xs">
				{props.nombreUsuario} &nbsp; • &nbsp; {props.fecha}
			</div>
		</div>
	);
}
