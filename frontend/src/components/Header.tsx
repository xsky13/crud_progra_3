import { Form } from "react-router";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export default function Header() {
    return (
        <div className="flex justify-around items-center py-2 fixed w-full">
            <h3>Comidas</h3>
            <Form action="/logout" method="post">
                <Button type="submit" variant="secondary">
                    <LogOutIcon />
                    Log out
                </Button>
            </Form>
        </div>
    );
}
