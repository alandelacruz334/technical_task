import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useHandleRegister } from "../hooks/useHandleRegister";
import { ROUTES } from "../router/routes";
import "../styles/login.css";
import type { IRegisterForm } from "../models/IRegisterForm";



const initialForm: IRegisterForm = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  surname: "",
  address: "",
};

export default function Register() {
  const {
    nickname,
    email,
    password,
    confirmPassword,
    name,
    surname,
    address,
    handleOnChangeInput,
  } = useForm<IRegisterForm>(initialForm);

  const { handleRegister, error, loading } = useHandleRegister(
    nickname,
    email,
    password,
    confirmPassword,
    name,
    surname,
    address,
  );

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleRegister();
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nickname">Nickname *</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => handleOnChangeInput("nickname", e.target.value)}
              autoComplete="username"
              required
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => handleOnChangeInput("email", e.target.value)}
              required
              maxLength={255}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => handleOnChangeInput("password", e.target.value)}
              autoComplete="new-password"
              required
              maxLength={255}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña *</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                handleOnChangeInput("confirmPassword", e.target.value)
              }
              autoComplete="new-password"
              required
              maxLength={255}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleOnChangeInput("name", e.target.value)}
              autoComplete="given-name"
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => handleOnChangeInput("surname", e.target.value)}
              autoComplete="family-name"
              maxLength={150}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => handleOnChangeInput("address", e.target.value)}
              autoComplete="street-address"
              maxLength={255}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
          }}
        >
          ¿Ya tienes cuenta?{" "}
          <Link
            to={ROUTES.LOGIN}
            style={{ color: "#2563eb", textDecoration: "none" }}
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
