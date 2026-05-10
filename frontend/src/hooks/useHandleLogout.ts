import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";

export const useHandleLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(ROUTES.LOGIN);
  };

  return { handleLogout };
};
