import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./routes/Home.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import React from "react";
import Registro from "./routes/Registro.tsx";
<<<<<<< HEAD
import register from "./services/register.ts";
import Login from "./routes/Login.tsx";
import login from "./services/login.ts";
=======
import register from "./services/auth/register.ts";
>>>>>>> 6889794de1522ce322339534718617e692c8c012
import Layout from "./routes/Layout.tsx";
import loadUser from "./services/auth/loadUser.ts";

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: Layout,
        loader: loadUser,
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
            {
                path: "login",
                Component: Login,
                action: login,
            }
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    React.createElement(RouterProvider, { router }),
);
