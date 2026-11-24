import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ cart = [] }) {
  const { usuario, estaAutenticado, esAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const manejarLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          FitLab
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarFitLab"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarFitLab">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Carrito ({totalItems})
              </Link>
            </li>
            {esAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-semibold" to="/admin">
                  Administración
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {estaAutenticado ? (
              <>
                <span className="text-light small me-2">
                  {usuario?.nombre || usuario?.correo}
                </span>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={manejarLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light btn-sm" to="/login">
                  Iniciar sesión
                </Link>
                <Link className="btn btn-light btn-sm" to="/register">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}