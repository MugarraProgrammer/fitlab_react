import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setStatus('Sesión iniciada correctamente (Demostración).');
    } else {
      setStatus('Por favor completa todos los campos.');
    }
  };

  return (
    <div className="login-page container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card login-card p-4">
            <h2 className="text-center mb-3">Iniciar Sesión</h2>
            <p className="text-center text-muted small mb-4">
              Ingresa tus credenciales para acceder a tu cuenta de FitLab.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="login-email">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="login-email"
                  className="form-control"
                  placeholder="nombre@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="login-password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="login-password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark w-100 mt-2">
                Ingresar ↗
              </button>
            </form>

            {status && (
              <div className="alert alert-info mt-3 mb-0 text-center small" role="status">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}