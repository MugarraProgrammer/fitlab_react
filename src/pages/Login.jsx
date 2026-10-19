import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <--- Importar Link

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // Acceso Administrador (admin / 1234)
    if (email === 'admin' && password === '1234') {
      localStorage.setItem('usuario', JSON.stringify({ rol: 'admin', user: 'admin' }));
      navigate('/admin');
      return;
    }

    // Login usuario comun
    if (email.includes('@') && password.length >= 4) {
      localStorage.setItem('usuario', JSON.stringify({ rol: 'user', user: email }));
      navigate('/cart');
    } else {
      setError('Credenciales inválidas. Verifique sus datos.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="fw-bold text-center mb-2">Iniciar Sesión</h3>
            <p className="text-muted text-center small mb-4">
              Ingresa a tu cuenta para continuar.
            </p>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Usuario / Correo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="admin o tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-dark w-100 py-2">
                Ingresar
              </button>
            </form>

            {/* Hipervínculo para Registrarse */}
            <div className="text-center mt-3 pt-3 border-top">
              <span className="text-muted small">¿No tienes una cuenta? </span>
              <Link to="/register" className="text-dark fw-bold small text-decoration-underline">
                Regístrate aquí
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;