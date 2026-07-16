import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React from "react";

const CommentItem = React.memo((props: {
	texto: string,
	votos: number,
	commentId: number,
	nombreUsuario: string,
	fecha: string,
	upvote: (commentId: number) => void,
	downvote: (commentId: number) => void,
}) => {

	function timeAgo(date: string | Date): string {
		const now = Date.now();
		const then = new Date(date).getTime();

		const seconds = Math.floor((now - then) / 1000);

		if (seconds < 10) return "recien";

		const intervals = [
			{ label: "año", seconds: 31536000 },
			{ label: "mes", seconds: 2592000 },
			{ label: "semana", seconds: 604800 },
			{ label: "día", seconds: 86400 },
			{ label: "hora", seconds: 3600 },
			{ label: "minuto", seconds: 60 },
			{ label: "segundo", seconds: 1 },
		];

		for (const interval of intervals) {
			const count = Math.floor(seconds / interval.seconds);

			if (count >= 1) {
				const plural =
					count === 1
						? interval.label
						: interval.label === "mes"
							? "meses"
							: interval.label + "s";

				return `Hace ${count} ${plural}`;
			}
		}

		return "recien";
	}

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
				{props.nombreUsuario} &nbsp; • &nbsp; {timeAgo(props.fecha)}
			</div>
		</div>
	);
});

export default CommentItem;
