type RegisterFormData = {
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
};

export default async function register({
    request,
}: {
    request: Request;
}): Promise<{ error?: string }> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as RegisterFormData;

    await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
        (response) => response.json(),
    );

    return { error: "Hubo un error" };
}
