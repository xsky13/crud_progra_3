import { Button } from "../components/ui/button";
import { AppLink } from "@/components/AppLink";

export default function Home() {
    return (
        <div>
            <h1>Fuap</h1>
            <AppLink to={"/registro"}>Registrarse</AppLink>
            <br />
            <Button>fuap</Button>
        </div>
    );
}
