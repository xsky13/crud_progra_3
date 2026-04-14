import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./routes/Home.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import React from "react";
import Registro from "./routes/Registro.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/registro",
        Component: Registro,
        action: async ({ request }: { request: Request }) => {
            const formData = await request.formData();
            await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
                (response) => response.json(),
            );
        },
    },
]);

createRoot(document.getElementById("root")!).render(
    React.createElement(RouterProvider, { router }),
);
