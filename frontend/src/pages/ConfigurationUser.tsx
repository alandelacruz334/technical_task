import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/authService";
import { useHandleLogout } from "../hooks/useHandleLogout";
import { ROUTES } from "../router/routes";
import "../styles/configurationUser.css";
import type { IUser } from "../models/IUser";

export default function ConfigurationUser() {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const { handleLogout } = useHandleLogout();

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        navigate(ROUTES.LOGIN);
      });
  }, [navigate]);

  if (!user) {
    return (
      <div className="user-wrap">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="user-wrap">
      <div className="user-box">
        <div className="user-header">
          <h1>Datos de Usuario</h1>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </div>

        <form className="user-form">
          <div className="form-group">
            <label>Nickname</label>
            <input type="text" value={user.nickname} readOnly />
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={user.name ?? ""} readOnly />
          </div>
          <div className="form-group">
            <label>Apellidos</label>
            <input type="text" value={user.surname ?? ""} readOnly />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input type="text" value={user.address ?? ""} readOnly />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user.email} readOnly />
          </div>
        </form>
      </div>
    </div>
  );
}