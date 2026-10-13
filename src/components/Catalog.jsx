import React from 'react';
import Product from './Product'; // <-- Aquí llamamos al componente que pidió el profe
import './Catalog.css';

function Catalog({ productos, alAgregarAlCarrito }) {
return (
<section className="my-4">
<h3 className="text-center text-uppercase fw-bold mb-4" style={{ color: '#ff7043' }}>
Catálogo de Suplementos
</h3>

<div className="row row-cols-1 row-cols-md-2 g-4">
{productos.map((prod) => (
<div className="col" key={prod.id}>
{/* Renderizamos cada producto usando el componente atómico */}
<Product producto={prod} alAgregarAlCarrito={alAgregarAlCarrito} />
</div>
))}
</div>
</section>
);
}

export default Catalog;