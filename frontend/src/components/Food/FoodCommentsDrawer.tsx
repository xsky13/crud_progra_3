import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, Drawer } from "../ui/drawer";
import { Textarea } from "../ui/textarea";
import { ComentarioPopup } from "../Comments/ComentarioPopup";
import type { Comment } from "@/types/Comment";

type CommentPopupTypes = {
	foodId: number;
	foodTitle: string;
	openFoodDrawerId: number | null,
	setOpenFoodDrawerId: React.Dispatch<React.SetStateAction<number | null>>
}


export default function FoodCommentsDrawer(props: CommentPopupTypes) {
	const user = useUser();
	const [commentText, setCommentText] = useState("");
	const [comentarios, setComentarios] = useState<Comment[]>([
		{
			id: 1,
			texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
			votos: 3,
			comidaId: 13,
			userId: 1,
			user: {
				nombre: "Jared"
			},
			fecha: "Hace 5 dias"
		}
	]);

	useEffect(() => {
		setTimeout(() => setComentarios(comentarios.filter(c => c.comidaId == props.openFoodDrawerId)), 0)
	}, [props.openFoodDrawerId])

	useEffect(() => {
		if (props.openFoodDrawerId != null) {
			console.log("working")
			setTimeout(() => {
				document.body.style.pointerEvents = "auto";
			}, 0);
		}
	}, [props.openFoodDrawerId]);

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
		<Drawer
			// key={props.openFoodDrawerId}
			direction="right"
			modal={false}
			open={props.openFoodDrawerId != null}
			onOpenChange={open =>
				props.setOpenFoodDrawerId(open ? props.foodId : null)
			}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Comentarios de {props.foodTitle}</DrawerTitle>
				</DrawerHeader>
				<div className="no-scrollbar overflow-y-auto mt-3 px-4 flex flex-col gap-5">
					<ComentarioPopup
						comentarios={comentarios}
						upvote={upvote}
						downvote={downvote}
					/>
				</div>
				<DrawerFooter>
					<Textarea
						placeholder="Tu comentario..."
						value={commentText}
						onChange={e => setCommentText(e.target.value)}
					/>
					<div className="flex gap-2 w-full mt-3">
						<DrawerClose asChild className="flex-1">
							<Button variant="secondary">Cerrar</Button>
						</DrawerClose>
						<Button className="flex-1" onClick={addComment}>Comentar</Button>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
