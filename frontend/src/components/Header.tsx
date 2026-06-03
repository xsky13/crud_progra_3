import { Form } from "react-router";
import { Button } from "./ui/button";
import { CogIcon, LogOutIcon } from "lucide-react";
import { AppLink } from "./Helpers/AppLink";
import useUser from "@/hooks/useUser";
import { UserRole } from "@/types/User";
import { ModeToggle } from "./Helpers/ModeToggle";

export default function Header() {
    const { rol: userRole } = useUser();
    return (
        <div className="flex justify-around items-center py-3 fixed w-full ">
            <div className="flex items-center gap-6">
                <div className="flex gap-2 items-center">
                    <img src="/favicon.png" width={30} />
                    <h3><AppLink to={"/"}>Comidas</AppLink></h3>
                </div>
                <AppLink to="/propuestas">
                    <Button variant="ghost">{userRole == UserRole.Usuario ? "Mis propuestas" : "Revisar propuestas"}</Button>
                </AppLink>
                <AppLink to="/podio">
                    <Button variant="ghost">Podio</Button>
                </AppLink>
            </div>
            <div className="flex items-center gap-6">
                <AppLink to="/configuraciones">
                    <Button variant="ghost">
                        <CogIcon />Cuenta</Button>
                </AppLink>
                <ModeToggle />
                <Form action="/logout" method="post">
                    <Button type="submit" variant="secondary">
                        <LogOutIcon />
                        Log out
                    </Button>
                </Form>
            </div>
        </div>
    );
}
