import React, { useState } from 'react';
import Navbar from './components/Navbar'; // <-- Importamos el Navbar

function App() {
  const [vistaActual, setVistaActual] = useState('home');
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [usuarioSesion, setUsuarioSesion] = useState(null);

  const cerrarSesion = () => {
    setUsuarioSesion(null);
  };

  return (
    <div>
      {/* Llamamos al componente Navbar */}
      <Navbar 
        cantCarrito={itemsCarrito.length}
        usuario={usuarioSesion}
        alCerrarSesion={cerrarSesion}
        cambiarVista={setVistaActual}
      />
      
      <main className="container my-5 text-white">
        <h1>Vista actual: {vistaActual}</h1>
      </main>
    </div>
  );
}

export default App;