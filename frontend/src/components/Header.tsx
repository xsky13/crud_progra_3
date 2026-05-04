import { Form } from "react-router";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export default function Header() {
    return (
        <div className="flex justify-around items-center py-3 fixed w-full">
            <div className="flex gap-2 items-center">
                <img src="/favicon.png" width={30} />
                <h3>Comidas</h3>
            </div>
            <Form action="/logout" method="post">
                <Button type="submit" variant="secondary">
                    <LogOutIcon />
                    Log out
                </Button>
            </Form>
        </div>
    );
}
