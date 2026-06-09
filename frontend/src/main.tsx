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
import rateFood from "./services/food/rateFood.ts";
import unrateFood from "./services/food/unrateFood.ts";
import ErrorBoundary from "./components/Helpers/ErrorBoundary.tsx";
import createProposal from "./services/proposals/createProposal.ts";
import Propuestas from "./routes/Propuestas.tsx";
import loadProposalsLoader from "./services/proposals/loadProposalsLoader.ts";
import editProposal from "./services/proposals/editProposal.ts";
import acceptProposal from "./services/proposals/acceptProposal.ts";
import deleteProposal from "./services/proposals/deleteProposal.ts";
import Configuraciones from "./routes/Configuraciones.tsx";
import authProtectedLoader from "./services/auth/authProtectedLoader.ts";
import updateAccount from "./services/auth/updateAccount.ts";
import deleteAccount from "./services/auth/deleteAccount.ts";
import Podio from "./routes/Podio.tsx";
import loadPodio from "./services/food/loadPodio.ts";

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: Layout,
        loader: loadUser,
        ErrorBoundary: ErrorBoundary,
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
            },
            {
                path: "/propuestas",
                Component: Propuestas,
                loader: loadProposalsLoader,
            },
            {
                path: "/podio",
                Component: Podio,
                loader: loadPodio,
            },
            {
                path: "configuraciones",
                Component: Configuraciones,
                loader: authProtectedLoader,
                action: updateAccount,
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
        path: "/rateFood/:id",
        action: rateFood
    },
    {
        path: "/unrateFood/:id",
        action: unrateFood
    },

    /* ROUTING DE PROPUESTAS */
    {
        path: "/createProposal",
        action: createProposal,
    },

    {
        path: "/editProposal/:id",
        action: editProposal,
    },

    {
        path: "/acceptProposal",
        action: acceptProposal,
    },

    {
        path: "/deleteProposal",
        action: deleteProposal,
    },

    {
        path: "logout",
        action: logout,
    },
    {
        path: "/deleteAccount",
        action: deleteAccount,
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />,
);
