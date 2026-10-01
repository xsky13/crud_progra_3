import { expect, test } from "@playwright/test";

test("permite iniciar sesión con credenciales válidas", async ({ page }) => {
    let authenticated = false;

    await page.route("**/api/User/me", async (route) => {
        if (!authenticated) {
            await route.fulfill({ status: 401, json: {} });
            return;
        }

        await route.fulfill({
            status: 200,
            json: {
                id: 7,
                nombre: "Ana",
                email: "ana@example.com",
                rol: 2,
            },
        });
    });

    await page.route("**/api/User/login", async (route) => {
        expect(route.request().postDataJSON()).toEqual({
            email: "ana@example.com",
            contrasena: "clave-de-prueba",
        });

        authenticated = true;
        await route.fulfill({ status: 200, json: {} });
    });

    await page.route("**/api/Comida", (route) =>
        route.fulfill({ status: 200, json: [] }),
    );

    await page.goto("/login");
    await page.getByLabel("Su correo electronico").fill("ana@example.com");
    await page.getByLabel("Su contraseña").fill("clave-de-prueba");
    await page.getByRole("button", { name: "Ingresar" }).click();

    await expect(page).toHaveURL(/\/$/);
});