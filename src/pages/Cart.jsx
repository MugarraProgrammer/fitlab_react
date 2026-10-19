import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Cart({ cartItems, updateQuantity, removeFromCart, clearCart }) {
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();

  const totalProductos = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const procederAlPago = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
      setMensajeError('Debes iniciar sesión para realizar la compra.');
      return;
    }

    alert('¡Compra realizada con éxito!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Carrito de Compras</h2>

      {mensajeError && (
        <div className="alert alert-warning text-center mb-4">
          {mensajeError}{' '}
          <Link to="/login" className="fw-bold text-dark">
            Iniciar sesión aquí
          </Link>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">Tu carrito está vacío.</p>
          <Link to="/" className="btn btn-dark">
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm p-3">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Total parcial</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="fw-bold">{item.nombre}</div>
                          <small className="text-muted">{item.categoria}</small>
                        </td>
                        <td>${item.precio.toLocaleString('es-CL')}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-outline-secondary btn-sm px-2 py-0"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </button>
                            <span className="fw-bold">{item.cantidad}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm px-2 py-0"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="fw-bold">
                          ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm p-4">
              <h5 className="fw-bold mb-3">Resumen de Compra</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Total de productos:</span>
                <span className="fw-bold">{totalProductos}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                <span>Total a pagar:</span>
                <span>${totalPrecio.toLocaleString('es-CL')}</span>
              </div>
              <button
                className="btn btn-dark w-100 py-2 fw-semibold"
                onClick={procederAlPago}
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;