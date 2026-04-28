export enum UserRole {
    Usuario = 1,
    Admin = 2,
}

export type User = {
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
    rol: UserRole;
};
