import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Cart({ cart = [], removeFromCart, updateQuantity, clearCart }) {
  const { estaAutenticado } = useAuth();
  const [avisoLogin, setAvisoLogin] = useState(false);
  const [compraExitosa, setCompraExitosa] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.quantity || 1),
    0
  );

  const manejarPago = () => {
    if (!estaAutenticado) {
      setAvisoLogin(true);
      setCompraExitosa(false);
      return;
    }

    setAvisoLogin(false);
    setCompraExitosa(true);
    if (clearCart) {
      clearCart();
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Carrito de Compras</h2>

      {compraExitosa && (
        <div className="alert alert-success" role="alert">
          ¡Compra realizada con éxito! Gracias por entrenar con FitLab.
        </div>
      )}

      {avisoLogin && (
        <div className="alert alert-warning" role="alert">
          Debes <Link to="/login" className="alert-link">iniciar sesión</Link> para completar tu compra.
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted mb-3">Tu carrito está vacío.</p>
          <Link to="/" className="btn btn-dark">
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive mb-4">
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
                {cart.map((item) => {
                  const cantidad = item.quantity || 1;
                  return (
                    <tr key={item.id}>
                      <td className="fw-semibold">{item.nombre}</td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity && updateQuantity(item.id, cantidad - 1)}
                          >
                            -
                          </button>
                          <span>{cantidad}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity && updateQuantity(item.id, cantidad + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="fw-bold">
                        ${(item.precio * cantidad).toLocaleString('es-CL')}
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart && removeFromCart(item.id)}
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <h4 className="fw-bold mb-0">Total: ${total.toLocaleString('es-CL')}</h4>
            <div className="d-flex gap-2">
              {clearCart && (
                <button className="btn btn-outline-secondary" onClick={clearCart}>
                  Vaciar carrito
                </button>
              )}
              <button className="btn btn-dark" onClick={manejarPago}>
                Pagar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}