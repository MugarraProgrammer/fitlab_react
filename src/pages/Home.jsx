import React from 'react';
import Catalog from '../components/Catalog';

function Home({ addToCart }) {
  return (
    <div className="container py-4">
      {/* Sección Promocional con Video */}
      <section className="mb-5 text-center">
        <h1 className="fw-bold mb-3">Bienvenido a FitLab</h1>
        <p className="lead text-muted mb-4">
          Equipamiento y suplementación de alta calidad para potenciar tu rendimiento.
        </p>
        
        {/* Contenedor de Video Local */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="ratio ratio-16x9 shadow rounded overflow-hidden bg-dark">
              <video 
                controls 
                autoPlay 
                muted 
                loop 
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              >
                <source src="/promo.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <Catalog addToCart={addToCart} />
    </div>
  );
}

export default Home;