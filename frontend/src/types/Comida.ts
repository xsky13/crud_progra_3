export type Comida = {
    id: number;
    titulo: string;
    imgUrl: string;
    promedioEstrellas: number;
    cantidadCalificaciones: number;
    confirmada: boolean;
    userId: number;
};

export type ComidaView = Comida & {
    usuarioCalifica: boolean;
    calificacionUsuario?: number;
};
