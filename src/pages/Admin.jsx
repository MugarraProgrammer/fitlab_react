import React, { useState, useEffect } from 'react';
import productosData from '../data/productos.json';
import './Admin.css';

export default function Admin() {
  // Carga los productos desde localStorage o desde productos.json
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : productosData;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ id: '', nombre: '', precio: '', imagen: '' });

  // Guarda en localStorage cada vez que la lista cambia
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  // Abrir formulario para crear un nuevo producto
  const handleNuevo = () => {
    setEditandoId(null);
    setFormData({ id: Date.now(), nombre: '', precio: '', imagen: '' });
    setMostrarFormulario(true);
  };

  // Abrir formulario para editar producto existente
  const handleEditar = (prod) => {
    setEditandoId(prod.id);
    setFormData(prod);
    setMostrarFormulario(true);
  };

  // Eliminar producto
  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProductos(productos.filter((prod) => prod.id !== id));
    }
  };

  // Guardar (Crear o Modificar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio) return;

    if (editandoId !== null) {
      setProductos(productos.map((prod) => (prod.id === editandoId ? formData : prod)));
    } else {
      setProductos([...productos, { ...formData, id: Date.now() }]);
    }

    setMostrarFormulario(false);
    setFormData({ id: '', nombre: '', precio: '', imagen: '' });
  };

  return (
    <div className="admin-page container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
        <button className="btn btn-dark btn-sm" onClick={handleNuevo}>
          + Agregar Producto
        </button>
      </div>

      {/* Formulario para Agregar / Editar */}
      {mostrarFormulario && (
        <div className="card card-body mb-4 bg-light shadow-sm">
          <h4>{editandoId !== null ? 'Editar Producto' : 'Nuevo Producto'}</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-5">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Precio ($)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Ruta de Imagen (Ej: /src/assets/hero.png)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.imagen || ''}
                  onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-success btn-sm me-2">
                {editandoId !== null ? 'Guardar Cambios' : 'Agregar'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Productos */}
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
                    <button className="btn btn-outline-secondary" onClick={() => handleEditar(prod)}>
                      Editar
                    </button>
                    <button className="btn btn-outline-danger" onClick={() => handleEliminar(prod.id)}>
                      Eliminar
                    </button>
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