import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./routes/Home.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import React from "react";
import Registro from "./routes/Registro.tsx";
import register from "./services/register.ts";
import Layout from "./routes/Layout.tsx";

const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "registro",
                Component: Registro,
                action: register,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    React.createElement(RouterProvider, { router }),
);
