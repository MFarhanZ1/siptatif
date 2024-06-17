import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/Login/main.tsx";
import RegisterPage from "../pages/Register/main.tsx";
import DashboardPage from "../pages/Dashboard/main.tsx";
import LupaPasswordPage from "../pages/LupaPassword/main.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/reset-password",
        element: <LupaPasswordPage />,
    },
]);

export default router;