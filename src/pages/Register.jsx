import React, { useState } from 'react';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setStatus('Las contraseñas no coinciden.');
      return;
    }
    setStatus('Cuenta creada exitosamente (Demostración).');
  };

  return (
    <div className="register-page container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card register-card p-4">
            <h2 className="text-center mb-3">Crear Cuenta</h2>
            <p className="text-center text-muted small mb-4">
              Regístrate para acceder a todas las funciones de FitLab.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="register-nombre">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="register-nombre"
                  name="nombre"
                  className="form-control"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="register-email">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  className="form-control"
                  placeholder="nombre@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="register-password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="register-confirmPassword">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="register-confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark w-100 mt-2">
                Registrarse ↗
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