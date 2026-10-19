import React, { useState, useEffect } from 'react';
import productosData from '../data/productos.json';

function Admin() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : productosData;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ id: '', nombre: '', precio: '', stock: 10 });

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const handleNuevo = () => {
    setEditandoId(null);
    setFormData({ id: Date.now(), nombre: '', precio: '', stock: 10 });
    setMostrarFormulario(true);
  };

  const handleEditar = (prod) => {
    setEditandoId(prod.id);
    setFormData({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      stock: prod.stock !== undefined ? prod.stock : 10
    });
    setMostrarFormulario(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProductos(productos.filter((prod) => prod.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio) return;

    if (editandoId !== null) {
      setProductos(productos.map((prod) => (prod.id === editandoId ? formData : prod)));
    } else {
      setProductos([...productos, { ...formData, id: Date.now() }]);
    }

    setMostrarFormulario(false);
    setFormData({ id: '', nombre: '', precio: '', stock: 10 });
  };

  return (
    <div className="admin-page container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Panel de Administración</h2>
        <button className="btn btn-dark" onClick={handleNuevo}>
          + Agregar Producto
        </button>
      </div>

      {/* Formulario para Agregar / Editar */}
      {mostrarFormulario && (
        <div className="card card-body mb-4 bg-light shadow-sm">
          <h4 className="fw-bold mb-3">{editandoId !== null ? 'Editar Producto' : 'Nuevo Producto'}</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-5">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Precio ($)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Cantidad (Stock)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {editandoId !== null ? 'Guardar Cambios' : 'Agregar'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Productos con Columna Stock */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>IDENTIFICACIÓN</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod, index) => {
              const stockActual = prod.stock !== undefined ? prod.stock : 10;
              const bajoStock = stockActual <= 3;

              return (
                <tr key={prod.id || index} className={bajoStock ? 'table-warning' : ''}>
                  <td className="fw-bold"># {prod.id || index + 1}</td>
                  <td>
                    {prod.nombre}
                    {bajoStock && (
                      <span className="badge bg-danger ms-2">
                        Comprar producto bajo stock
                      </span>
                    )}
                  </td>
                  <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                  <td>
                    <span className={`fw-bold ${bajoStock ? 'text-danger' : 'text-dark'}`}>
                      {stockActual} un.
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-secondary" onClick={() => handleEditar(prod)}>
                        Editar
                      </button>
                      <button className="btn btn-outline-danger" onClick={() => handleEliminar(prod.id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;