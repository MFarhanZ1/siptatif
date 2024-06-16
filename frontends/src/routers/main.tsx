import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/Login/main.tsx";
import RegisterPage from "../pages/Register/main.tsx";
import LupaPasswordPage from "../pages/Lupa Password/main.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import SideBarAdminProdi from "../pages/Dashboard/AdminProdi/SideBarAdminProdi.tsx";
import SideMahasiswa from "../pages/Dashboard/Mahasiswa/main.tsx";


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
  {
    path: "/adminprodi",
    element: <SideBarAdminProdi />,
  },
  {
    path: "/mahasiswa",
    element: <SideMahasiswa />,
  },
]);

export default router;
