import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { ROUTES } from "../router/routes";

export const useHandleRegister = (
  nickname: string,
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  surname: string,
  address: string,
) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (): string => {
    if (!nickname || !email || !password || !confirmPassword)
      return "Nickname, email y contraseña son obligatorios";
    if (password.length < 8)
      return "La contraseña debe tener al menos 8 caracteres";
    if (password !== confirmPassword) return "Las contraseñas no coinciden";
    return "";
  };

  const handleRegister = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    register(
      nickname,
      email,
      password,
      name || undefined,
      surname || undefined,
      address || undefined,
    )
      .then(() => navigate(ROUTES.LOGIN))
      .catch((err: Error) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  return { handleRegister, error, loading };
};
