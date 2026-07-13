export type Comment = {
	id: number,
	texto: string,
	votos: number;
	fecha: string,
	comidaId: number;
	userId: number;
	user: {
		nombre: string
	}
}
