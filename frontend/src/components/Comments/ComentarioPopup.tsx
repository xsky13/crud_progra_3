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

type CommentPopupTypes = {
	foodTitle: string;
}

export function ComentarioPopup(props: CommentPopupTypes) {
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

	const upvote = (comidaId: number) => {
		setComentarios(prev => prev.map(c =>
			c.comidaId == comidaId ?
				{ ...c, votos: c.votos + 1 }
				: c
		))
	}

	const downvote = (comidaId: number) => {
		setComentarios(prev => prev.map(c =>
			c.comidaId == comidaId ?
				{ ...c, votos: c.votos - 1 }
				: c
		))
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
									comidaId={comentario.comidaId}
									nombreUsuario={comentario.user.nombre}
									fecha={comentario.fecha}
									upvote={upvote}
									downvote={downvote}
								/>
							))
					}
				</div>
				<DrawerFooter>
					<Textarea placeholder="Tu comentario..." />
					<div className="flex gap-2 w-full mt-3">
						<DrawerClose asChild className="flex-1">
							<Button variant="outline">Cerrar</Button>
						</DrawerClose>
						<Button className="flex-1">Comentar</Button>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
