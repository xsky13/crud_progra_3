import useUser from "@/hooks/useUser";
import { Button } from "../components/ui/button";

export default function Home() {
    const user = useUser();
    return user ? (
        <h1>{user.nombre}</h1>
    ) : (
        <div>
            <h1>Fuap</h1>
            <Button>fuap</Button>
        </div>
    );
}
