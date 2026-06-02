import { Form } from "react-router";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { AppLink } from "./Helpers/AppLink";
import useUser from "@/hooks/useUser";
import { UserRole } from "@/types/User";

export default function Header() {
    const { rol: userRole } = useUser();
    return (
        <div className="flex justify-around items-center py-3 fixed w-full bg-white">
            <div className="flex gap-2 items-center">
                <img src="/favicon.png" width={30} />
                <h3><AppLink to={"/"}>Comidas</AppLink></h3>
            </div>
            <div className="flex items-center gap-6">
                <Button variant="ghost">
                    <AppLink to="/propuestas">{userRole == UserRole.Usuario ? "Mis propuestas" : "Revisar propuestas"}</AppLink>
                </Button>
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
