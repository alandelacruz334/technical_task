import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useHandleLogIn } from "../hooks/useHandleLogin";
import { ROUTES } from "../router/routes";
import "../styles/login.css";
import type { ILoginForm } from "../models/ILoginForm";


const initialForm: ILoginForm = { nickname: "", password: "" };

export default function Login() {
  const { nickname, password, handleOnChangeInput,  } =
    useForm<ILoginForm>(initialForm);
  const { handleLogIn, error, loading } = useHandleLogIn(
    nickname,
    password,
    
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogIn();
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nickname">Nickname</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => handleOnChangeInput("nickname", e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => handleOnChangeInput("password", e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p style={{ marginTop: "16px", textAlign: "center", fontSize: "14px", color: "#666" }}>
          ¿No tienes cuenta?{" "}
          <Link to={ROUTES.REGISTER} style={{ color: "#2563eb", textDecoration: "none" }}>
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}