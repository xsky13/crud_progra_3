import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, Drawer } from "../ui/drawer";
import { Textarea } from "../ui/textarea";
import type { Comment } from "@/types/Comment";
import api from "@/api";
import { Spinner } from "../ui/spinner";
import { useFetcher } from "react-router";
import createComment from "@/services/comment/createComment";
import SubmitButton from "../Helpers/SubmitButton";
import { CommentContext } from "@/context/commentContext";
import type deleteComment from "@/services/comment/deleteComment";
import { toast } from "sonner";
import { InfoIcon } from "lucide-react";
import CommentItem from "./CommentItem";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

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
	const deleteCommentFetcher = useFetcher<typeof deleteComment>();


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
			setTimeout(() => setComentarios(prev => [createCommentFetcher.data!.newComment!, ...prev]), 0);
		} else if (createCommentFetcher.data?.error) {
			toast.error(createCommentFetcher.data.error.msg);
		}
	}, [createCommentFetcher.data]);

	const removeComment = (commentId: number) => {
		deleteCommentFetcher.submit({}, {
			method: 'DELETE',
			action: `/deleteComment/${commentId}`
		});
		if (deleteCommentFetcher.data?.error) {
			toast.error(deleteCommentFetcher.data.error.msg)
		} else setComentarios(prev => prev.filter(c => c.id != commentId));
	}

	return (
		<CommentContext.Provider value={{
			deleteComment: removeComment,
			upvote, downvote
		}}>
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
										/>
									))
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
		</CommentContext.Provider>
	);
}
