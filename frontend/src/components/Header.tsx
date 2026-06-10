import { Form } from "react-router";
import { Button } from "./ui/button";
import { CogIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { AppLink } from "./Helpers/AppLink";
import useUser from "@/hooks/useUser";
import { UserRole } from "@/types/User";
import { ModeToggle } from "./Helpers/ModeToggle";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Separator } from "./ui/separator";


export default function Header() {
    const user = useUser();
    const userRole = user?.rol;
    return (
        <div className="flex justify-between bg-background pl-5 pr-3 md:pl-0 md:justify-around items-center py-3 fixed w-full z-50">
            <div className="flex items-center gap-6">
                <div className="flex gap-2 items-center">
                    <img src="/favicon.png" width={30} />
                    <h3><AppLink to={"/"}>Comidas</AppLink></h3>
                </div>
                {
                    user &&
                    <>
                        <AppLink to="/propuestas" className="hidden md:block">
                            <Button variant="ghost">{userRole == UserRole.Usuario ? "Mis propuestas" : "Revisar propuestas"}</Button>
                        </AppLink>
                        <AppLink to="/podio" className="hidden md:block">
                            <Button variant="ghost">Podio</Button>
                        </AppLink>
                    </>
                }
            </div>

            {user && <div className="items-center gap-6 hidden md:flex">
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
            </div>}

            <div className="flex gap-1 md:hidden">
                <ModeToggle />
                {user && <NavigationMenu >
                    <NavigationMenuList >
                        <NavigationMenuItem >
                            <NavigationMenuTrigger className="[&>svg:last-child]:hidden"><MenuIcon /></NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-80 list-none!">
                                    <li>
                                        <NavigationMenuLink>
                                            <AppLink to="/propuestas" className="py-1 leading-none font-medium">
                                                {userRole == UserRole.Usuario ? "Mis propuestas" : "Revisar propuestas"}
                                            </AppLink>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink>
                                            <AppLink to="/podio" className="py-1 leading-none font-medium">
                                                Podio
                                            </AppLink>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink>
                                            <AppLink to="/configuraciones" className="py-1 leading-none font-medium">
                                                Mi Cuenta
                                            </AppLink>
                                        </NavigationMenuLink>
                                    </li>
                                    <Separator className="my-2" />
                                    <li>
                                        <NavigationMenuLink>
                                            <Form action="/logout" method="post" className="w-full">
                                                <button type="submit" className="w-full inline-flex items-center leading-none gap-2 font-medium">
                                                    <LogOutIcon />
                                                    Log out
                                                </button>
                                            </Form>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>}
            </div>

        </div >
    );
}
