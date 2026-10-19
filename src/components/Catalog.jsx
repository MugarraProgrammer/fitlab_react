import React, { useState } from 'react';
import productosData from '../data/productos.json';

function Catalog({ addToCart }) {
  const productos = Array.isArray(productosData) ? productosData : [];
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoAyudaId, setProductoAyudaId] = useState(null);

  const productosPorPagina = 4;
  const ultimoIndice = paginaActual * productosPorPagina;
  const primerIndice = ultimoIndice - productosPorPagina;
  const productosActuales = productos.slice(primerIndice, ultimoIndice);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
      setProductoAyudaId(null);
    }
  };

  const toggleAyuda = (id) => {
    setProductoAyudaId(productoAyudaId === id ? null : id);
  };

  const obtenerInstruccionUso = (producto) => {
    const nombre = producto.nombre.toLowerCase();
    
    if (nombre.includes('creatina')) {
      return 'Modo de uso: Tomar entre 3 a 5 gramos diarios disueltos en agua o jugo de manera constante todos los días.';
    }
    if (nombre.includes('proteína') || nombre.includes('whey')) {
      return 'Modo de uso: Mezclar 1 scoop (30g) en 250ml de agua o leche después de entrenar.';
    }
    if (nombre.includes('bcaa') || nombre.includes('aminoácidos')) {
      return 'Modo de uso: Mezclar 1 scoop en agua y consumir durante o después del entrenamiento.';
    }
    if (nombre.includes('banda')) {
      return 'Modo de uso: Anclar a un punto fijo o sujetar firmemente para ejercicios de resistencia.';
    }
    if (nombre.includes('mancuerna')) {
      return 'Modo de uso: Realizar de 3 a 4 series de 10 a 12 repeticiones controlando el movimiento.';
    }
    return 'Modo de uso: Seguir las indicaciones del empaque.';
  };

  return (
    <section className="my-5">
      <h2 className="text-center fw-bold mb-4">Nuestros Productos</h2>
      
      <div className="row g-4">
        {productosActuales.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6">
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
              <img
                src={producto.imagen}
                className="card-img-top w-100"
                alt={producto.nombre}
                style={{ height: '260px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column p-4">
                <div>
                  <span className="badge bg-secondary mb-2">
                    {producto.categoria}
                  </span>
                  <h5 className="card-title fw-bold mb-2">{producto.nombre}</h5>
                  <p className="card-text text-muted small mb-3">
                    {producto.descripcion}
                  </p>
                </div>

                {productoAyudaId === producto.id && (
                  <div className="alert alert-info py-2 px-3 my-2 small border-0 bg-light text-dark">
                    <strong>Ayuda de Uso:</strong> {obtenerInstruccionUso(producto)}
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                  <span className="fw-bold fs-5">
                    ${producto.precio ? producto.precio.toLocaleString('es-CL') : '0'}
                  </span>
                  
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => toggleAyuda(producto.id)}
                    >
                      {productoAyudaId === producto.id ? 'Ocultar' : 'Ayuda'}
                    </button>
                    
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => addToCart(producto)}
                    >
                      Agregar al carro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            &lt;
          </button>

          <span className="mx-2 fw-semibold small">
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            &gt;
          </button>
        </div>
      )}
    </section>
  );
}

export default Catalog;