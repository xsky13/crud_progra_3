import { AppLink } from "@/components/Helpers/AppLink";
import SubmitButton from "@/components/Helpers/SubmitButton";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import errorToast from "@/lib/errorToast";
import type login from "@/services/auth/login";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useFetcher } from "react-router";
import { toast } from "sonner";

export default function Login() {
    const fetcher = useFetcher<typeof login>();
    const toastId = useRef<string | number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (fetcher.data?.error?.msg) {
            toastId.current = errorToast(fetcher.data.error?.msg);
        }
    }, [fetcher.data]);

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.dismiss(toastId.current);
        fetcher.submit(e.currentTarget, { method: "POST" });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 h-fit">
                <div className="my-4">
                    <div className="flex gap-x-4 items-center">
                        <img src="/favicon.png" width={40} />
                        <h1>Iniciar sesión</h1>
                    </div>
                    <div className="mt-3.5 w-32 border border-primary"></div>
                </div>
                <fetcher.Form onSubmit={onSubmit} className="my-5">
                    <FieldGroup>
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
                            Ingresar
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
                        <AppLink to="/registro">Crear una cuenta</AppLink>
                    </Button>
                </div>
            </div>
        </div>
    );
}
