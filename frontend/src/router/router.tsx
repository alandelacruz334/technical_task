import { createHashRouter, Navigate } from "react-router-dom";
import ConfigurationUser from "../pages/ConfigurationUser";
import { ROUTES } from "./routes";
import Login from "../pages/Login";
import Register from "../pages/Register";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to={ROUTES.LOGIN}  />;
};

export const router = createHashRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.USER,
    element: (
      <ProtectedRoute>
        <ConfigurationUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.LOGIN}  />,
  },
]);