import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ComidaView } from "@/types/Comida";
import { UserRole } from "@/types/User";
import { MessageSquareText, StarIcon } from "lucide-react";
import useUser from "@/hooks/useUser";
import EditFoodModal from "./EditFoodModal";
import DeleteFood from "./DeleteFood";
import { useFetcher } from "react-router";
import { useEffect, useRef, useState } from "react";
import EditProposal from "../Proposals/EditProposal";
import { toast } from "sonner";
import { ComentarioPopup } from "../Comments/ComentarioPopup";

const PromedioEstrellas = ({
	promedioEstrellas,
	cantidadCalificaciones,
	start,
}: {
	promedioEstrellas: number;
	cantidadCalificaciones: number;
	start?: boolean;
}) => {
	return (
		<div
			className={`inline-flex flex-col items-${start ? "start" : "end"}`}
		>
			<div className="flex gap-1 items-center font-bold text-black dark:text-white">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
					<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
				</svg>
				{Math.round(((promedioEstrellas + Number.EPSILON) * 10)) / 10}/5
			</div>
			<div className="text-xs text-muted-foreground">
				{cantidadCalificaciones} calificaciones
			</div>
		</div>
	);
};

export default function FoodCard({ data }: { data: ComidaView }) {
	const currentUser = useUser();
	const fetcher = useFetcher();
	const starsParentRef = useRef<HTMLDivElement | null>(null);
	const [comida, setComida] = useState(data);
	const previousComida = useRef(comida);

	useEffect(() => {
		setComida(data);
	}, [data]);

	useEffect(() => {
		if (fetcher.data?.error?.msg) {
			toast.error("Error", {
				description: fetcher.data.error.msg,
				classNames: {
					toast: "!bg-red-200 !text-red-800 !border-none !shadow-red-500/50",
					description: "!text-red-800",
				},
			});
			setComida(previousComida.current);
		}
	}, [fetcher.data]);

	const hoverStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
		if (comida.calificacionUsuario) return;

		const children = Array.from(e.currentTarget.parentElement!.children) as HTMLElement[];
		children.forEach((child, i) =>
			i <= idx ? ((child.children[0] as SVGElement).style.fill = "#FFB900") : null,
		);
	};

	const unhoverStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
		if (comida.calificacionUsuario) return;

		const children = Array.from(e.currentTarget.parentElement!.children) as HTMLElement[];
		children.forEach((child, i) =>
			i <= idx ? ((child.children[0] as SVGElement).style.fill = "transparent") : null,
		);
	};

	const rateFood = (rating: number) => {
		if (comida.usuarioCalifica) return;

		previousComida.current = comida;

		fetcher.submit({ rating }, {
			method: "POST",
			encType: "application/json",
			action: `/rateFood/${comida.id}`
		});

		// La formula anterior no funciono por el retraso mental que manejo. Ahora sacamos la sumatoria de calificaciones despejando,
		// y despues le agregamos la nueva calificacion, dividimos por la cantidad de calificaciones mas 1, y obtenemos el nuevo promedio.
		const sumatoriaCalificacionesAnterior = comida.promedioEstrellas * comida.cantidadCalificaciones;

		setComida(prevState => ({
			...prevState,
			usuarioCalifica: true,
			promedioEstrellas: (sumatoriaCalificacionesAnterior + rating) / (comida.cantidadCalificaciones + 1),
			cantidadCalificaciones: prevState.cantidadCalificaciones + 1,
			calificacionUsuario: rating
		}));
	}

	const unrateFood = () => {
		fetcher.submit({}, {
			method: "POST",
			encType: "application/json",
			action: `/unrateFood/${comida.id}`
		});

		// hacer que las estrellas esten blancas
		if (starsParentRef.current) {
			console.log(starsParentRef.current.children)
			Array.from(starsParentRef.current.children).forEach((child) => {
				const icon = child.children[0] as SVGElement | undefined;
				if (icon) icon.style.fill = "transparent";
			})
		}

		const sumatoriaCalificacionesAnterior = comida.promedioEstrellas * comida.cantidadCalificaciones;
		const sumatoriaCalificacionesSinUsuario = sumatoriaCalificacionesAnterior - (comida.calificacionUsuario || 0);

		const promedioNuevo = comida.cantidadCalificaciones > 0 ?
			sumatoriaCalificacionesSinUsuario / comida.cantidadCalificaciones
			: 0;

		setComida(prevState => ({
			...prevState,
			usuarioCalifica: false,
			promedioEstrellas: promedioNuevo,
			cantidadCalificaciones: prevState.cantidadCalificaciones - 1,
			calificacionUsuario: 0
		}));
	}

	return (
		<Card className="w-full max-w-sm pt-0">
			<img
				src={comida.imgUrl}
				alt="Event cover"
				className="aspect-video w-full object-cover"
			/>
			<CardHeader className="items-center">
				<CardTitle className="tracking-wide">{comida.titulo}</CardTitle>
				{currentUser.rol == UserRole.Admin ? (
					<>
						<CardAction>
							<div className="flex">
								<EditFoodModal comida={comida} />
								<DeleteFood comidaId={comida.id} />
							</div>
						</CardAction>
						<CardDescription className="my-2 w-full">
							<PromedioEstrellas
								start={true}
								cantidadCalificaciones={comida.cantidadCalificaciones}
								promedioEstrellas={comida.promedioEstrellas}
							/>
						</CardDescription>
					</>
				) : (
					<CardAction>
						{
							comida.confirmada ?
								<PromedioEstrellas
									cantidadCalificaciones={comida.cantidadCalificaciones}
									promedioEstrellas={comida.promedioEstrellas}
								/>
								:
								comida.userId == currentUser.id &&
								<>
									<EditProposal comidaId={comida.id} comidaTitle={comida.titulo} />
									<DeleteFood comidaId={comida.id} />
								</>
						}
					</CardAction>
				)}
			</CardHeader>
			{(currentUser.rol == UserRole.Usuario && comida.confirmada) && (
				<>
					<CardDescription className="">
						<div className="flex flex-col items-center justify-center py-5 rounded-md w-full -mt-2">
							<div className="flex justify-center text-amber-400" ref={starsParentRef}>
								{Array.from({ length: 5 }).map((_, i) => (
									<div
										key={i}
										className="px-1 first:pl-0"
										onMouseOut={(e) => unhoverStar(e, i)}
										onMouseOver={(e) => hoverStar(e, i)}
									>
										<StarIcon
											className={
												!comida.usuarioCalifica
													? "cursor-pointer"
													: "cursor-default"
											}
											onClick={() => rateFood(i + 1)}
											size={20}
											fill={
												comida.usuarioCalifica &&
													comida.calificacionUsuario != null &&
													i < comida.calificacionUsuario
													? "#ffba00"
													: "transparent"
											}
										/>
									</div>
								))}
							</div>
							{comida.calificacionUsuario != null && (
								<span
									className="cursor-pointer mt-3 text-red-700 tracking-wide hover:text-red-800"
									onClick={unrateFood}
								>
									Eliminar mi calificacion
								</span>
							)}
						</div>
					</CardDescription>
					<CardFooter>
						<ComentarioPopup
							foodId={comida.id}
							foodTitle={comida.titulo}
						/>
					</CardFooter>
				</>
			)}
		</Card>
	);
}
