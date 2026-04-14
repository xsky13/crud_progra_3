import { AppLink } from "@/components/AppLink";
import ErrorItem from "@/components/ErrorItem";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type register from "@/services/register";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useFetcher } from "react-router";

export default function Registro() {
    const fetcher = useFetcher<typeof register>();
    const actionData = fetcher.data;

    useEffect(() => console.log(actionData), [actionData]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 h-fit">
                <h1>Registrarse</h1>
                <fetcher.Form method="POST" className="my-5">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="nombre">Su nombre</FieldLabel>
                            <Input id="nombre" name="nombre" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="apellido">
                                Su apellido
                            </FieldLabel>
                            <Input id="apellido" name="apellido" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">
                                Su correo electronico
                            </FieldLabel>
                            <Input id="email" type="email" name="email" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="contrasena">
                                Su contraseña
                            </FieldLabel>
                            <Input
                                id="contrasena"
                                type="password"
                                name="contrasena"
                            />
                        </Field>
                        <SubmitButton
                            className="w-full"
                            isSubmitting={fetcher.state == "submitting"}
                        >
                            Crear cuenta
                        </SubmitButton>
                    </FieldGroup>
                    {actionData?.error && (
                        <ErrorItem className="mt-5" error={actionData.error} />
                    )}
                </fetcher.Form>
                <div className="flex justify-between">
                    <Button variant="link" asChild>
                        <AppLink to="/">
                            <ArrowLeft /> Volver
                        </AppLink>
                    </Button>
                    <Button type="submit" variant="link" className="mx-0!">
                        Ya tengo una cuenta
                    </Button>
                </div>
            </div>
        </div>
    );
}
