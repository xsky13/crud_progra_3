export enum UserRole {
    Usuario = 1,
    Admin = 2,
}

export type User = {
    id: number;
    nombre: string;
    email: string;
    contrasena: string;
    rol: UserRole;
};
