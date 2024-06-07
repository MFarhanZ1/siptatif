import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Login from "./pages/Login/main.tsx";
import Register from "./pages/Register/main.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <div className="w-full h-screen">
      <RouterProvider router={router} />
    </div>
  </div>
);
