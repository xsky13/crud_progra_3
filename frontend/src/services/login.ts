type LoginFormData = {
    email: string;
    contrasena: string;
};
 
export default async function login({
    request,
}: {
    request: Request;
}): Promise<{ error?: { msg: string; field: string }; token?: string }> {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as LoginFormData;
 
    if (
        !data.email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[ ^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
    ) {
        return { error: { msg: "Su email no es valido", field: "email" } };
    } else if (data.contrasena.length < 6) {
        return {
            error: {
                msg: "Su contrasena debe tener por lo menos 6 caracteres",
                field: "contrasena",
            },
        };
    } else {
        // TODO: reemplazar con el endpoint real de login
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/1",
        ).then((res) => res.json());
 
        return { token: "mi-token" };
    }
}