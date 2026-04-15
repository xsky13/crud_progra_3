import { AppLink } from "@/components/AppLink";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type register from "@/services/register";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

export default function Registro() {
    const fetcher = useFetcher<typeof register>();

    useEffect(() => {
        if (fetcher.data?.error?.msg) {
            toast.error("Error", {
                description: fetcher.data?.error?.msg,
                classNames: {
                    toast: "!bg-red-200 !text-red-800 !border-none !shadow-red-500/50",
                    description: "!text-red-800",
                },
            });
        }
    }, [fetcher.data]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 h-fit">
                <div className="my-4">
                    <div className="flex gap-x-4 items-center">
                        <img src="/favicon.png" width={40} />
                        <h1>Registrarse</h1>
                    </div>
                    <div className="mt-3.5 w-32 border border-primary"></div>
                </div>
                <fetcher.Form method="POST" className="my-5">
                    <FieldGroup>
                        <Field
                            data-invalid={
                                fetcher.data?.error?.field == "nombre"
                            }
                        >
                            <FieldLabel htmlFor="nombre">Su nombre</FieldLabel>
                            <Input
                                id="nombre"
                                name="nombre"
                                aria-invalid={
                                    fetcher.data?.error?.field == "nombre"
                                }
                            />
                        </Field>
                        <Field
                            data-invalid={
                                fetcher.data?.error?.field == "apellido"
                            }
                        >
                            <FieldLabel htmlFor="apellido">
                                Su apellido
                            </FieldLabel>
                            <Input
                                id="apellido"
                                name="apellido"
                                aria-invalid={
                                    fetcher.data?.error?.field == "apellido"
                                }
                            />
                        </Field>
                        <Field
                            data-invalid={fetcher.data?.error?.field == "email"}
                        >
                            <FieldLabel htmlFor="email">
                                Su correo electronico
                            </FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                aria-invalid={
                                    fetcher.data?.error?.field == "email"
                                }
                            />
                        </Field>
                        <Field
                            data-invalid={
                                fetcher.data?.error?.field == "contrasena"
                            }
                        >
                            <FieldLabel htmlFor="contrasena">
                                Su contraseña
                            </FieldLabel>
                            <Input
                                id="contrasena"
                                type="password"
                                name="contrasena"
                                aria-invalid={
                                    fetcher.data?.error?.field == "contrasena"
                                }
                            />
                        </Field>
                        <SubmitButton
                            className="w-full"
                            isSubmitting={fetcher.state == "submitting"}
                        >
                            Crear cuenta
                        </SubmitButton>
                    </FieldGroup>
                </fetcher.Form>
                <div className="flex justify-between">
                    <Button variant="link" asChild>
                        <AppLink to="/">
                            <ArrowLeft /> Volver
                        </AppLink>
                    </Button>
                    <Button type="submit" variant="link" className="mx-0!">
                        <AppLink to="/login">Ya tengo una cuenta</AppLink>
                    </Button>
                </div>
            </div>
        </div>
    );
}
