import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, Drawer } from "../ui/drawer";
import { Textarea } from "../ui/textarea";
import type { CommentView } from "@/types/Comment";
import api from "@/api";
import { Spinner } from "../ui/spinner";
import { useFetcher, useSubmit } from "react-router";
import createComment from "@/services/comment/createComment";
import SubmitButton from "../Helpers/SubmitButton";
import { CommentContext } from "@/context/commentContext";
import deleteComment from "@/services/comment/deleteComment";
import { toast } from "sonner";
import { InfoIcon } from "lucide-react";
import CommentItem from "./CommentItem";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import upvoteComment from "@/services/comment/upvoteComment";
import type downvoteComment from "@/services/comment/downvoteComment";

type CommentPopupTypes = {
	foodId: number;
	foodTitle: string;
	openFoodDrawerId: number | null,
	setOpenFoodDrawerId: React.Dispatch<React.SetStateAction<number | null>>
}


export default function FoodCommentsDrawer(props: CommentPopupTypes) {
	const [commentText, setCommentText] = useState("");
	const [comentarios, setComentarios] = useState<CommentView[]>([]);
	const [loading, setLoading] = useState(false);
	const createCommentFetcher = useFetcher<typeof createComment>();
	const deleteCommentFetcher = useFetcher<typeof deleteComment>();
	const upvoteFetcher = useFetcher<typeof upvoteComment>();
	const downvoteFetcher = useFetcher<typeof downvoteComment>();

	const cacheCommentRef = useRef<CommentView>([]);


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
		const comment = comentarios.filter(c => c.id == commentId)[0];
		if (!comment) return;

		cacheCommentRef.current = comment;

		if (comment.userVote) {
			if (comment.userVote == 1) {
				// previous vote was upvote, so upvote is removed
				setComentarios(prev => prev.map(c =>
					c.id == commentId ?
						{ ...c, userVote: 0, votos: c.votos - 1 }
						: c
				))
			} else {
				// previous vote was downvote (-1), so we add upvote and compensate for previous downvote
				setComentarios(prev => prev.map(c =>
					c.id == commentId ?
						{ ...c, userVote: 1, votos: c.votos + 2 }
						: c
				))
			}
		} else {
			// completely new upvote
			setComentarios(prev => prev.map(c =>
				c.id == commentId ?
					{ ...c, userVote: 1, votos: c.votos + 1 }
					: c
			))
		}

		upvoteFetcher.submit({}, {
			action: "/upvoteComment/" + commentId,
			method: "POST"
		});
	}

	useEffect(() => {
		if (upvoteFetcher.data?.error) {
			toast.error("Ocurrio un error.");
			setComentarios(prev => prev.map(c => c.id == cacheCommentRef.current.id ? cacheCommentRef.current : c));
		}
	}, [upvoteFetcher.data])

	const downvote = (commentId: number) => {
		const comment = comentarios.filter(c => c.id == commentId)[0];
		if (!comment) return;

		cacheCommentRef.current = comment;

		if (comment.userVote) {
			if (comment.userVote == 1) {
				// previous vote was upvote, so add downvote and compensate
				setComentarios(prev => prev.map(c =>
					c.id == commentId ?
						{ ...c, userVote: -1, votos: c.votos - 2 }
						: c
				))
			} else {
				// previous vote was downvote (-1), just remove
				setComentarios(prev => prev.map(c =>
					c.id == commentId ?
						{ ...c, userVote: 0, votos: c.votos + 1 }
						: c
				))
			}
		} else {
			// completely new downvote
			setComentarios(prev => prev.map(c =>
				c.id == commentId ?
					{ ...c, userVote: -1, votos: c.votos - 1 }
					: c
			))
		}


		downvoteFetcher.submit({}, {
			action: "/downvoteComment/" + commentId,
			method: "POST"
		});
	}

	useEffect(() => {
		if (downvoteFetcher.data?.error) {
			toast.error("Ocurrio un error.");
			setComentarios(prev => prev.map(c => c.id == cacheCommentRef.current.id ? cacheCommentRef.current : c));
		}
	}, [downvoteFetcher.data])


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

	const deletedCommentRef = useRef<number>(0);
	const removeComment = (commentId: number) => {
		deleteCommentFetcher.submit({}, {
			method: 'DELETE',
			action: `/deleteComment/${commentId}`
		});
		deletedCommentRef.current = commentId;
	}

	useEffect(() => {
		if (deleteCommentFetcher.data?.error) {
			toast.error(deleteCommentFetcher.data.error.msg)
		} else setComentarios(prev => prev.filter(c => c.id != deletedCommentRef.current))
	}, [deleteCommentFetcher.data])

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
									comentarios.map(comentario => (
										<CommentItem
											key={comentario.id}
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
