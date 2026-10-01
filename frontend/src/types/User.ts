export enum UserRole {
    Admin = 1,
    Usuario = 2,
}

export type User = {
    id: number;
    nombre: string;
    email: string;
    rol: UserRole;
};
