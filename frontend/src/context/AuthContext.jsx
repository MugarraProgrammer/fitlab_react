import React, { createContext, useContext, useState } from 'react';
import {
  cerrarSesionStorage,
  loginApi,
  obtenerToken,
  obtenerUsuarioGuardado,
  registerApi,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => obtenerUsuarioGuardado());
  const [token, setToken] = useState(() => obtenerToken());

  const login = async (credenciales) => {
    const data = await loginApi(credenciales);
    setToken(data.token);
    setUsuario(obtenerUsuarioGuardado());
    return data;
  };

  const registrar = async (datosUsuario) => {
    const data = await registerApi(datosUsuario);
    if (data.token) {
      setToken(data.token);
      setUsuario(obtenerUsuarioGuardado());
    }
    return data;
  };

  const logout = () => {
    cerrarSesionStorage();
    setToken(null);
    setUsuario(null);
  };

  const estaAutenticado = Boolean(token && usuario);
  const esAdmin = usuario?.rol === 'ADMIN' || usuario?.rol === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider
      value={{ usuario, token, estaAutenticado, esAdmin, login, registrar, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}