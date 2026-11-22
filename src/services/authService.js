const BASE_URL = '/api/auth';
const TOKEN_KEY = 'fitlab_token';
const USER_KEY = 'fitlab_usuario';

async function pedirAuth(url, datos) {
  const respuesta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const mensaje = await respuesta.text();
    throw new Error(mensaje || `Error HTTP ${respuesta.status}`);
  }

  return respuesta.json();
}

export async function loginApi(credenciales) {
  const data = await pedirAuth(`${BASE_URL}/login`, credenciales);
  guardarSesion(data);
  return data;
}

export async function registerApi(datosUsuario) {
  const data = await pedirAuth(`${BASE_URL}/registro`, datosUsuario);
  if (data.token) {
    guardarSesion(data);
  }
  return data;
}

export function guardarSesion(data) {
  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }
  const usuario = {
    nombre: data.nombre || '',
    correo: data.correo || data.email || '',
    rol: data.rol || 'USER',
  };
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function obtenerToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function obtenerUsuarioGuardado() {
  const guardado = localStorage.getItem(USER_KEY);
  return guardado ? JSON.parse(guardado) : null;
}

export function cerrarSesionStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}