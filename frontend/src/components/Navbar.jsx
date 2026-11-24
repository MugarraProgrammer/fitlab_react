import React from 'react';
import './Navbar.css'; // <-- Importación del CSS dedicado

function Navbar({ cantCarrito, usuario, alCerrarSesion, cambiarVista }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top">
      <div className="container">
        
        {/* Marca FitLab */}
        <button 
          className="navbar-brand border-0 bg-transparent navbar-brand-custom"
          onClick={() => cambiarVista('home')}
        >
          FitLab
        </button>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
            
            <li className="nav-item">
              <button 
                className="btn btn-link nav-link nav-btn-link text-decoration-none" 
                onClick={() => cambiarVista('home')}
              >
                Inicio
              </button>
            </li>

            {/* Carrito en Texto Puro sin Íconos */}
            <li className="nav-item">
              <button 
                className="btn btn-outline-warning position-relative me-2" 
                onClick={() => cambiarVista('cart')}
              >
                Carrito
                {cantCarrito > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-danger cart-badge-custom">
                    {cantCarrito}
                  </span>
                )}
              </button>
            </li>

            {/* Control de Sesión */}
            {usuario ? (
              <>
                {usuario.rol === 'admin' && (
                  <li className="nav-item">
                    <button 
                      className="btn btn-warning fw-bold text-dark me-2" 
                      onClick={() => cambiarVista('admin')}
                    >
                      Panel Admin
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <span className="text-light me-2 small">Hola, {usuario.nombre}</span>
                  <button 
                    className="btn btn-outline-light btn-sm" 
                    onClick={alCerrarSesion}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light me-2" 
                    onClick={() => cambiarVista('login')}
                  >
                    Iniciar Sesión
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-warning fw-bold" 
                    onClick={() => cambiarVista('register')}
                  >
                    Registrarse
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;