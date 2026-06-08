import { AppLink } from "@/components/Helpers/AppLink";
import SubmitButton from "@/components/Helpers/SubmitButton";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import errorToast from "@/lib/errorToast";
import type updateAccount from "@/services/auth/updateAccount";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Form, useFetcher } from "react-router";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

export default function Configuraciones() {
    const user = useUser();
    const fetcher = useFetcher<typeof updateAccount>();
    const toastId = useRef<string | number>(0);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (fetcher.data?.error?.msg) {
            toastId.current = errorToast(fetcher.data.error.msg);
            setUpdateSuccess(false);
        } else if (fetcher.data?.success) {
            toast.dismiss(toastId.current);
            toast.success("Datos actualizados correctamente");
            setUpdateSuccess(true);
        }
    }, [fetcher.data]);

    if (!user) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg font-semibold">Necesitas iniciar sesión para ver esta página.</p>
                    <div className="mt-4 flex justify-center gap-3">
                        <Button asChild variant="secondary">
                            <AppLink to="/login">Iniciar sesión</AppLink>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-28 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-background p-8 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">Configuración de cuenta</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Cambia tu nombre, correo o contraseña. También puedes eliminar tu cuenta.
                        </p>
                    </div>
                    <Button variant="ghost" asChild>
                        <AppLink to="/">
                            <ArrowLeft /> Volver al inicio
                        </AppLink>
                    </Button>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
                    <div className="rounded-3xl border border-border bg-secondary/5 p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">Editar datos</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Actualiza tu información personal y contraseña.
                        </p>

                        <fetcher.Form
                            method="post"
                            className="mt-6 space-y-5"
                        >
                            <FieldGroup>
                                <Field data-invalid={fetcher.data?.error?.field == "nombre"}>
                                    <FieldLabel htmlFor="nombre">Nombre completo</FieldLabel>
                                    <Input
                                        id="nombre"
                                        name="nombre"
                                        defaultValue={user.nombre}
                                        aria-invalid={fetcher.data?.error?.field == "nombre"}
                                    />
                                </Field>
                                <Field data-invalid={fetcher.data?.error?.field == "email"}>
                                    <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        defaultValue={user.email}
                                        aria-invalid={fetcher.data?.error?.field == "email"}
                                    />
                                </Field>
                                <Field data-invalid={fetcher.data?.error?.field == "contrasena"}>
                                    <FieldLabel htmlFor="contrasena">Nueva contraseña</FieldLabel>
                                    <Input
                                        id="contrasena"
                                        type="password"
                                        name="contrasena"
                                        placeholder="Dejar vacío conserva la contraseña actual"
                                        aria-invalid={fetcher.data?.error?.field == "contrasena"}
                                    />
                                </Field>
                            </FieldGroup>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <SubmitButton
                                    className="w-full sm:w-auto"
                                    isSubmitting={fetcher.state == "submitting"}
                                >
                                    Guardar cambios
                                </SubmitButton>
                                {updateSuccess && (
                                    <span className="text-sm text-foreground/80">
                                        Cambios guardados con éxito.
                                    </span>
                                )}
                            </div>
                        </fetcher.Form>
                    </div>

                    <div className="rounded-3xl border border-border bg-destructive/5 p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-destructive-foreground">Eliminar cuenta</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Esta acción eliminará tu cuenta y cerrará tu sesión. No se puede deshacer.
                        </p>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="mt-6 w-full">
                                    <Trash2 /> Eliminar cuenta
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Confirmar eliminación</DialogTitle>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.
                                    </p>
                                    <Form action="/deleteAccount" method="post" className="mt-6">
                                        <Button type="submit" variant="destructive" className="w-full">
                                            <Trash2 /> Sí, eliminar cuenta
                                        </Button>
                                    </Form>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}
