import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { InfoIcon, MessageSquareText } from "lucide-react"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "../ui/alert";
import { Textarea } from "../ui/textarea";
import Comment from "./Comment";

type CommentPopupTypes = {
	foodTitle: string;
}

export function ComentarioPopup(props: CommentPopupTypes) {
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
				{/*<div className="no-scrollbar overflow-y-auto px-4">
					<Alert>
						<InfoIcon />
						<AlertTitle>Todavía no hay comentarios</AlertTitle>
						<AlertDescription>Se el primero en comentar!</AlertDescription>
					</Alert>
				</div>*/}
				<div className="no-scrollbar overflow-y-auto mt-3 px-4 flex flex-col gap-5">

					<Comment
						texto="Buena comida hace falta que le vomiten encima nomas"
						votos={4}
						comidaId={1}
						nombreUsuario="Jared"
						fecha="Hace 5 dias"
					/>
					<Comment
						texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt"
						votos={4}
						comidaId={1}
						nombreUsuario="Jared"
						fecha="Hace 5 dias"
					/>
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
