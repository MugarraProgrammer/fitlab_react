import { obtenerToken } from './authService';

const BASE_URL = '/api/productos';

async function pedir(url, opciones = {}) {
  const token = obtenerToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opciones.headers,
  };

  const respuesta = await fetch(url, {
    ...opciones,
    headers,
  });

  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}`);
  }

  return respuesta.status === 204 ? null : respuesta.json();
}

export function listarProductos(signal) {
  return pedir(BASE_URL, { signal });
}

export function obtenerProducto(id) {
  return pedir(`${BASE_URL}/${id}`);
}

export function crearProducto(producto) {
  return pedir(BASE_URL, { method: 'POST', body: JSON.stringify(producto) });
}

export function actualizarProducto(id, producto) {
  return pedir(`${BASE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(producto) });
}

export function eliminarProducto(id) {
  return pedir(`${BASE_URL}/${id}`, { method: 'DELETE' });
}