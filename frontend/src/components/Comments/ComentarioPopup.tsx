import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { InfoIcon, MessageSquareText } from "lucide-react"
import { Textarea } from "../ui/textarea";
import CommentItem from "./CommentItem";
import { useState } from "react";
import type { Comment } from "@/types/Comment";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import useUser from "@/hooks/useUser";

type CommentPopupTypes = {
	foodId: number;
	foodTitle: string;
}

export function ComentarioPopup(props: CommentPopupTypes) {
	const user = useUser();
	const [commentText, setCommentText] = useState("");
	const [comentarios, setComentarios] = useState<Comment[]>([
		{
			id: 1,
			texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
			votos: 3,
			comidaId: 1,
			userId: 1,
			user: {
				nombre: "Jared"
			},
			fecha: "Hace 5 dias"
		}
	]);

	const upvote = (commentId: number) => {
		setComentarios(prev => prev.map(c =>
			c.id == commentId ?
				{ ...c, votos: c.votos + 1 }
				: c
		))
	}

	const downvote = (commentId: number) => {
		setComentarios(prev => prev.map(c =>
			c.id == commentId ?
				{ ...c, votos: c.votos - 1 }
				: c
		))
	}

	const addComment = () => {
		setComentarios(prev => [...prev, {
			id: comentarios[comentarios.length - 1].id + 1,
			texto: commentText,
			votos: 0,
			comidaId: props.foodId,
			user: {
				nombre: user.nombre
			},
			userId: user.id,
			fecha: "ahora"
		}]);
		setCommentText("");
	}

	return (
		<Drawer direction="right" modal={false}>
			<DrawerTrigger asChild>
				<Button
					className="w-full font-medium"
					variant="secondary"
				>
					<MessageSquareText />
					Ver comentarios
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Comentarios de {props.foodTitle}</DrawerTitle>
				</DrawerHeader>
				<div className="no-scrollbar overflow-y-auto mt-3 px-4 flex flex-col gap-5">
					{
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
									texto={comentario.texto}
									votos={comentario.votos}
									commentId={comentario.id}
									nombreUsuario={comentario.user.nombre}
									fecha={comentario.fecha}
									upvote={upvote}
									downvote={downvote}
								/>
							))
					}
				</div>
				<DrawerFooter>
					<Textarea
						placeholder="Tu comentario..."
						value={commentText}
						onChange={e => setCommentText(e.target.value)}
					/>
					<div className="flex gap-2 w-full mt-3">
						<DrawerClose asChild className="flex-1">
							<Button variant="outline">Cerrar</Button>
						</DrawerClose>
						<Button className="flex-1" onClick={addComment}>Comentar</Button>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
