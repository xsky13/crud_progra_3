import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, Drawer } from "../ui/drawer";
import { Textarea } from "../ui/textarea";
import { ComentarioPopup } from "../Comments/ComentarioPopup";
import type { Comment } from "@/types/Comment";
import api from "@/api";
import { Spinner } from "../ui/spinner";
import { useFetcher } from "react-router";
import createComment from "@/services/comment/createComment";
import SubmitButton from "../Helpers/SubmitButton";

type CommentPopupTypes = {
	foodId: number;
	foodTitle: string;
	openFoodDrawerId: number | null,
	setOpenFoodDrawerId: React.Dispatch<React.SetStateAction<number | null>>
}


export default function FoodCommentsDrawer(props: CommentPopupTypes) {
	const [commentText, setCommentText] = useState("");
	const [comentarios, setComentarios] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(false);
	const createCommentFetcher = useFetcher<typeof createComment>();


	useEffect(() => {
		(async () => {
			setLoading(true)
			const comments = await api.get("/comment/" + props.foodId)
				.then(res => res.data)
				.catch(err => console.log(err))
				.finally(() => setLoading(false));
			setComentarios(comments);
		})()

		if (props.openFoodDrawerId != null) {
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
		createCommentFetcher.submit({
			comidaId: props.foodId,
			commentText
		}, {
			method: "POST",
			encType: "application/json",
			action: `/comment`
		});
		setCommentText("")
	}

	useEffect(() => {
		if (createCommentFetcher.data && createCommentFetcher.data.newComment) {
			setComentarios(prev => [createCommentFetcher.data!.newComment!, ...prev]);
		}
	}, [createCommentFetcher.data])

	return (
		<Drawer
			// key={props.openFoodDrawerId}
			direction="right"
			modal={false}
			open={props.openFoodDrawerId != null}
			onOpenChange={open => {
				props.setOpenFoodDrawerId(open ? props.foodId : null)
				setCommentText("")
			}}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Comentarios de {props.foodTitle}</DrawerTitle>
				</DrawerHeader>
				<div className="no-scrollbar overflow-y-auto mt-3 px-4 flex flex-col gap-5">
					{
						loading ?
							<div className="block m-auto">
								<Spinner />
							</div>
							:
							<ComentarioPopup
								comentarios={comentarios}
								upvote={upvote}
								downvote={downvote}
							/>
					}
				</div>
				<DrawerFooter>
					{
						!loading &&
						<>
							<Textarea
								placeholder="Tu comentario..."
								value={commentText}
								onChange={e => setCommentText(e.target.value)}
							/>
							<div className="flex gap-2 w-full mt-3">
								<DrawerClose asChild className="flex-1">
									<Button variant="secondary">Cerrar</Button>
								</DrawerClose>
								<SubmitButton
									isSubmitting={createCommentFetcher.state == "submitting"}
									className="flex-1"
									onClick={addComment}
								>
									Comentar
								</SubmitButton>
							</div>
						</>
					}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
