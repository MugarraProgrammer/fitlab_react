import React from 'react';
import './Cart.css';

export default function Cart() {
  // Datos de muestra/ejemplo para el carrito
  const cartItems = [
    { id: 1, name: 'Zapatillas FitLab Runner', price: 49990, quantity: 1, image: 'https://via.placeholder.com/80' },
    { id: 2, name: 'Mancuernas 10kg', price: 29990, quantity: 2, image: 'https://via.placeholder.com/80' },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page container my-5">
      <h2 className="mb-4">Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Tu carrito está vacío.</div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img src={item.image} alt={item.name} className="cart-item-img" />
                          <span className="fw-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td>${item.price.toLocaleString('es-CL')}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm cart-quantity-input"
                          defaultValue={item.quantity}
                          min="1"
                        />
                      </td>
                      <td>${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm" title="Eliminar">
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card cart-summary-card p-3">
              <h4 className="card-title mb-3">Resumen del Pedido</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Envío:</span>
                <span className="text-success fw-semibold">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
                <span>Total:</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
              <button className="btn btn-dark w-100">Proceder al Pago ↗</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}