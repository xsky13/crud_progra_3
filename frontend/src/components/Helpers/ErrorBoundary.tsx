import { isRouteErrorResponse, useRouteError } from "react-router";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

export default function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.state?.idx === 0) {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    if (isRouteErrorResponse(error)) {
        if (error.status == 404) {
            return (
                <div className="h-screen flex flex-col justify-center items-center -mt-10">
                    <img
                        src="/uap_logo.svg"
                        className="mb-6"
                        width={300}
                        alt="logo uap"
                    />
                    <h2>404 • Pagina no encontrada</h2>
                    <Button variant="secondary" onClick={() => handleBack()} className="mt-6 w-72" size="lg">
                        <ChevronLeft />
                        Volver
                    </Button>
                </div>
            )
        }
        return (
            <>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>En:</p>
                <pre>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}
