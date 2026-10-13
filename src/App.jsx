import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Product from './components/Product';

function App() {
const [vistaActual, setVistaActual] = useState('home');
const [itemsCarrito, setItemsCarrito] = useState([]);

// Producto de prueba para previsualizar el componente Product
const productoPrueba = {
id: 1,
nombre: 'Proteína Whey Isolate',
descripcion: 'Proteína de suero de leche de rápida absorción 1kg.',
precio: 34990,
stock: 5
};

const agregarAlCarrito = (prod) => {
setItemsCarrito([...itemsCarrito, prod]);
};

return (
<div className="bg-dark min-vh-100 text-white d-flex flex-column">
<Navbar
cantCarrito={itemsCarrito.length}
usuario={null}
alCerrarSesion={() => {}}
cambiarVista={setVistaActual}
/>

<main className="container my-5 flex-grow-1">
<h4 className="text-warning mb-4">Mapeo preliminar de componentes:</h4>

{/* Muestra tu tarjeta de producto en una columna */}
<div className="row justify-content-center">
<div className="col-md-5">
<Product
producto={productoPrueba}
alAgregarAlCarrito={agregarAlCarrito}
/>
</div>
</div>
</main>

<Footer />
</div>
);
}

export default App;