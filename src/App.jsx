import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Importamos el Footer

function App() {
const [vistaActual, setVistaActual] = useState('home');
const [itemsCarrito, setItemsCarrito] = useState([]);
const [usuarioSesion, setUsuarioSesion] = useState(null);

const cerrarSesion = () => {
setUsuarioSesion(null);
};

return (
<div className="bg-dark min-vh-100 text-white d-flex flex-column">
{/* Componente Navbar */}
<Navbar
cantCarrito={itemsCarrito.length}
usuario={usuarioSesion}
alCerrarSesion={cerrarSesion}
cambiarVista={setVistaActual}
/>

{/* Contenido principal */}
<main className="container my-5 flex-grow-1">
<h2 className="text-warning">Vista actual: {vistaActual}</h2>
<p className="text-light">Los componentes Navbar y Footer están vinculados correctamente con sus archivos CSS.</p>
</main>

{/* Componente Footer */}
<Footer />
</div>
);
}

export default App;
