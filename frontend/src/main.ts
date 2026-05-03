import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./routes/Home.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import React from "react";
import Registro from "./routes/Registro.tsx";
import register from "./services/auth/register.ts";
import Login from "./routes/Login.tsx";
import login from "./services/auth/login.ts";

import Layout from "./routes/Layout.tsx";
import loadUser from "./services/auth/loadUser.ts";
import authCheckLoader from "./services/auth/authCheckLoader.ts";
import logout from "./services/auth/logout.ts";
import loadFood from "./services/food/loadFood.ts";
import createFood from "./services/food/createFood.ts";

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
                loader: loadFood,
            },
            {
                path: "registro",
                Component: Registro,
                action: register,
                loader: authCheckLoader,
            },
            {
                path: "login",
                Component: Login,
                action: login,
                loader: authCheckLoader,
            },
        ],
    },
    {
        path: "/createFood",
        action: createFood,
    },
    {
        path: "logout",
        action: logout,
    },
]);

createRoot(document.getElementById("root")!).render(
    React.createElement(RouterProvider, { router }),
);
