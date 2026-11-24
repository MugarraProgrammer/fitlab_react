import React, { useState } from 'react';
import useProductos from '../hooks/useProductos';
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
} from '../services/productosService';

const FORM_INICIAL = {
  nombre: '',
  categoria: '',
  precio: '',
  imagen: '',
  descripcion: '',
};

export default function Admin() {
  const { productos, cargando, error, recargar } = useProductos();
  const [formulario, setFormulario] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [mensajeError, setMensajeError] = useState('');
  const [guardando, setGuardando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setMensajeError('');
    setFormulario({
      nombre: producto.nombre || '',
      categoria: producto.categoria || '',
      precio: producto.precio ?? '',
      imagen: producto.imagen || '',
      descripcion: producto.descripcion || '',
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormulario(FORM_INICIAL);
    setMensajeError('');
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setGuardando(true);

    const payload = {
      ...formulario,
      precio: Number(formulario.precio),
    };

    try {
      if (editandoId) {
        await actualizarProducto(editandoId, payload);
      } else {
        await crearProducto(payload);
      }
      cancelarEdicion();
      recargar();
    } catch {
      setMensajeError('No se pudo guardar el producto. Verifica tu sesión de administrador.');
    } finally {
      setGuardando(false);
    }
  };

  const manejarEliminar = async (id) => {
    setMensajeError('');
    try {
      await eliminarProducto(id);
      if (editandoId === id) {
        cancelarEdicion();
      }
      recargar();
    } catch {
      setMensajeError('No se pudo eliminar el producto.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Panel de Administración</h2>

      {mensajeError && (
        <div className="alert alert-danger" role="alert">
          {mensajeError}
        </div>
      )}

      <div className="card shadow-sm border-0 p-4 mb-5">
        <h5 className="fw-bold mb-3">
          {editandoId ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h5>

        <form onSubmit={manejarSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={formulario.nombre}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Categoría</label>
              <input
                type="text"
                name="categoria"
                className="form-control"
                value={formulario.categoria}
                onChange={manejarCambio}
                placeholder="Suplementos / Equipamiento"
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Precio (CLP)</label>
              <input
                type="number"
                name="precio"
                className="form-control"
                value={formulario.precio}
                onChange={manejarCambio}
                min="0"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">URL o ruta de imagen</label>
              <input
                type="text"
                name="imagen"
                className="form-control"
                value={formulario.imagen}
                onChange={manejarCambio}
                placeholder="/img/producto.png"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Descripción</label>
              <input
                type="text"
                name="descripcion"
                className="form-control"
                value={formulario.descripcion}
                onChange={manejarCambio}
                required
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-dark" disabled={guardando}>
              {guardando
                ? 'Guardando...'
                : editandoId
                ? 'Actualizar Producto'
                : 'Agregar Producto'}
            </button>

            {editandoId && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {cargando && <p className="text-muted">Cargando productos...</p>}
      {error && (
        <div className="alert alert-danger">Error al cargar la lista de productos.</div>
      )}

      {!cargando && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                    />
                  </td>
                  <td className="fw-semibold">{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${producto.precio ? producto.precio.toLocaleString('es-CL') : '0'}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => iniciarEdicion(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => manejarEliminar(producto.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}