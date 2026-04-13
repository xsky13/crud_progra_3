import { AppLink } from "@/components/AppLink";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function Registro() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 h-fit">
                <h1>Registrarse</h1>
                <div className="my-5">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="nombre">Su nombre</FieldLabel>
                            <Input id="nombre" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="apellido">
                                Su apellido
                            </FieldLabel>
                            <Input id="apellido" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">
                                Su correo electronico
                            </FieldLabel>
                            <Input id="email" type="email" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="contrasena">
                                Su contraseña
                            </FieldLabel>
                            <Input id="contrasena" type="password" />
                        </Field>
                        <Button className="w-full">Crear cuenta</Button>
                    </FieldGroup>
                </div>
                <div className="flex justify-between">
                    <Button variant="link" asChild className="mx-0!">
                        <AppLink to="/">
                            <ArrowLeft /> Volver
                        </AppLink>
                    </Button>
                    <Button variant="link" className="mx-0!">
                        Ya tengo una cuenta
                    </Button>
                </div>
            </div>
        </div>
    );
}
