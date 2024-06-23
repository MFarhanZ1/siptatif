import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/Login/main.tsx";
import RegisterPage from "../pages/Register/main.tsx";
import LupaPasswordPage from "../pages/LupaPassword/main.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
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
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
