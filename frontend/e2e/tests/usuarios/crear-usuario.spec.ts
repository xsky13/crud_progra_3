import { expect, test } from "@playwright/test";

test("registra una cuenta que luego puede iniciar sesión", async ({
    page,
    request,
}) => {
    const email = `e2e-${Date.now()}-${test.info().workerIndex}@example.com`;
    const contrasena = "clave-de-prueba";

    // No usar page.route para simular /User/register.
    await page.goto("/registro");
    await page.getByLabel("Nombre completo").fill("Ana Pérez");
    await page.getByLabel("Su correo electronico").fill(email);
    await page.getByLabel("Su contraseña").fill(contrasena);
    await page.getByRole("button", { name: "Crear cuenta" }).click();

    await expect(page).toHaveURL(/\/$/);

    // Verifica contra el backend real que la cuenta quedó registrada.
    const loginResponse = await request.post(
        "http://localhost:5125/api/User/login",
        { data: { email, contrasena } },
    );

    expect(loginResponse.ok()).toBeTruthy();
});