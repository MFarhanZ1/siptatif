import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/Login/main.tsx";
import RegisterPage from "../pages/Register/main.tsx";
import DashboardPage from "../pages/Dashboard/main.tsx";

const router = createBrowserRouter([
    {
        path: "/",
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
]);

export default router;