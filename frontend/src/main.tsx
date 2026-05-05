import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./routes/Home.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
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
import deleteFood from "./services/food/deleteFood.ts";
import updateFood from "./services/food/updateFood.ts";

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: Layout,
        loader: loadUser,
        HydrateFallback: () => {
            return (
                <div className="h-screen flex items-center justify-center">
                    <img src="/loading.svg" width={150} />
                </div>
            );
        },
        children: [
            {
                index: true,
                Component: Home,
                loader: loadFood,
                HydrateFallback: () => {
                    return <p>Loading...</p>;
                },
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
        path: "/deleteFood",
        action: deleteFood,
    },
    {
        path: "/updateFood",
        action: updateFood,
    },
    {
        path: "logout",
        action: logout,
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />,
);
