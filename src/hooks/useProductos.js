import { useCallback, useEffect, useState } from 'react';
import { listarProductos } from '../services/productosService';

// Hook personalizado: comparte la carga del catálogo entre Home y Admin.
// Devuelve los productos, el estado de carga/error y una función para recargar.
export default function useProductos() {
  const [catalogo, setCatalogo] = useState({
    productos: [],
    cargando: true,
    error: false,
  });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    listarProductos(controlador.signal)
      .then((productos) => setCatalogo({ productos, cargando: false, error: false }))
      .catch(() => {
        if (!controlador.signal.aborted) {
          setCatalogo({ productos: [], cargando: false, error: true });
        }
      });
    // Cancela la petición si se desmonta la vista antes de recibir la respuesta.
    return () => controlador.abort();
  }, [version]);

  // Cambiar "version" vuelve a ejecutar el useEffect y pide los datos de nuevo.
  const recargar = useCallback(() => setVersion((v) => v + 1), []);

  return { ...catalogo, recargar };
}