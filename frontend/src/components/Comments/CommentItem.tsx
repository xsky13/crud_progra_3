import { ChevronDownIcon, ChevronUpIcon, Trash2Icon } from "lucide-react";
import React, { useContext, useState } from "react";
import useUser from "@/hooks/useUser";
import type { CommentView } from "@/types/Comment";
import { Spinner } from "../ui/spinner";
import { CommentContext } from "@/context/commentContext";

const CommentItem = React.memo((props: {
	comment: CommentView,
}) => {
	const user = useUser();
	const [loading, setLoading] = useState(false);
	const commentContext = useContext(CommentContext);

	const deleteComment = () => {
		setLoading(true);
		commentContext?.deleteComment(props.comment.id);
		setLoading(false);
	}

	function timeAgo(date: string | Date): string {
		// eslint-disable-next-line react-hooks/purity
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
		<div className="bg-muted p-3 rounded-md">
			<div className="flex items-start gap-3">
				<div className="flex items-center flex-col">
					<ChevronUpIcon
						className={`cursor-pointer ${props.comment.userVote == 1 && "bg-primary text-white rounded-full"}`}
						size={20}
						onClick={() => commentContext?.upvote(props.comment.id)}
					/>
					<span className="text-xs">{props.comment.votos}</span>
					<ChevronDownIcon
						className={`cursor-pointer ${props.comment.userVote == -1 && "bg-blue-700 text-white rounded-full"}`}
						size={20}
						onClick={() => commentContext?.downvote(props.comment.id)}
					/>
				</div>
				{props.comment.texto}
			</div>
			<div className="flex justify-between">
				{
					!(user.id == props.comment.userId) &&
					<div className="invisible">hack</div>
				}
				{
					user.id == props.comment.userId &&
					<div className="ml-[.0935rem] mt-1">
						{
							!loading ?
								<Trash2Icon
									onClick={deleteComment}
									className="cursor-pointer"
									size={17}
								/>
								:
								<Spinner />
						}
					</div>
				}
				<div className="float-right text-xs">
					{props.comment.user.nombre} &nbsp; • &nbsp; {timeAgo(props.comment.fecha)}
				</div>
			</div>
		</div>
	);
});

export default CommentItem;
