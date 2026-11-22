import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaProtegida({ children, rolRequerido }) {
  const { estaAutenticado, usuario } = useAuth();

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  if (
    rolRequerido &&
    usuario?.rol !== rolRequerido &&
    usuario?.rol !== `ROLE_${rolRequerido}`
  ) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading fw-bold">Acceso denegado</h4>
          <p className="mb-0">No tienes permisos de administrador para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  return children;
}