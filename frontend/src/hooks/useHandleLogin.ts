import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { ROUTES } from "../router/routes";

export const useHandleLogIn = (nickname: string, password: string) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async () => {
    setError("");
    setLoading(true);

    login(nickname, password)
      .then((res) => {
        if (res?.token) {
          localStorage.setItem("token", res.token);

          navigate(ROUTES.USER);
        }
      })
      .catch(() => {
        setError("Usuario o contraseña incorrectos");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleLogIn, error, loading };
};
