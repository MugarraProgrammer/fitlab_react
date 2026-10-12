import React from 'react';
import './Product.css';

function Product({ producto, alAgregarAlCarrito }) {
  return (
    <div className="card h-100 bg-dark text-white product-card">
      <div className="product-img-placeholder border-bottom border-secondary">
        {producto.nombre}
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-light">{producto.nombre}</h5>
          <p className="card-text small text-secondary">{producto.descripcion}</p>
        </div>
        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fs-5 fw-bold text-warning">
              ${producto.precio.toLocaleString('es-CL')}
            </span>
            <span className={`badge ${producto.stock <= 3 ? 'bg-danger' : 'bg-success'}`}>
              Stock: {producto.stock}
            </span>
          </div>
          <button 
            className="btn btn-outline-warning w-100 fw-bold"
            onClick={() => alAgregarAlCarrito(producto)}
            disabled={producto.stock === 0}
          >
            {producto.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;