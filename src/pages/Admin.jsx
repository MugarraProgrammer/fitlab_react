import React, { useState } from 'react';
import productosData from '../data/productos.json';
import './Admin.css';

export default function Admin() {
  const [productos, setProductos] = useState(productosData);

  return (
    <div className="admin-page container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
        <button className="btn btn-dark btn-sm">+ Agregar Producto</button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>#{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary">Editar</button>
                    <button className="btn btn-outline-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}