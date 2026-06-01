export enum UserRole {
    Usuario = 1,
    Admin = 2,
}

export type User = {
    nombre: string;
    email: string;
    contrasena: string;
    rol: UserRole;
};
