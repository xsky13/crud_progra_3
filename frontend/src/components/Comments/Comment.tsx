import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function Comment(props: {
	texto: string,
	votos: number,
	comidaId: number,
	nombreUsuario: string,
	fecha: string
}) {
	return (
		<div>
			<div className="flex items-start gap-3">
				<div className="flex items-center flex-col">
					<ChevronUpIcon
						className="cursor-pointer"
						size={20}
					/>
					<span className="text-xs">{props.votos}</span>
					<ChevronDownIcon
						className="cursor-pointer"
						size={20}
					/>
				</div>
				{props.texto}
			</div>
			<div className="float-right text-xs">
				{props.nombreUsuario} &nbsp; • &nbsp; {props.fecha}
			</div>
		</div>
	);
}
