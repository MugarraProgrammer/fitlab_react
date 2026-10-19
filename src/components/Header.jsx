import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header({ totalItems }) {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
  }, [location]);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
  };

  return (
    <header className="bg-white border-bottom shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="text-decoration-none text-dark d-flex align-items-center gap-2">
          <span className="fs-3 fw-bold tracking-tight">FITLAB</span>
        </Link>

        <nav className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none text-dark fw-semibold">
            Inicio
          </Link>
          
          <Link to="/cart" className="text-decoration-none text-dark fw-semibold">
            Carrito ({totalItems})
          </Link>

          {usuario && usuario.rol === 'admin' && (
            <Link to="/admin" className="btn btn-dark btn-sm fw-semibold">
              Administración
            </Link>
          )}

          {usuario ? (
            <button onClick={handleCerrarSesion} className="btn btn-outline-danger btn-sm">
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-dark btn-sm">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-warning btn-sm fw-semibold">
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;