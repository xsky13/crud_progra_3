import type { User } from "@/types/User";
import { Form } from "react-router";
import { Button } from "./ui/button";

export default function Header({ user }: { user?: User | null }) {
    return (
        <div className="flex justify-around items-center py-2 fixed w-full">
            <h3>Comidas</h3>
            <Form action="/logout" method="post">
                <Button type="submit">Log out</Button>
            </Form>
        </div>
    );
}
