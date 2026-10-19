import React, { useState } from 'react';

function Infcorp() {
  const [seccion, setSeccion] = useState('consejo'); // 'consejo' o 'rutina'

  return (
    <section className="container my-5 text-dark">
      {/* Botones de seleccion */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className={`btn ${seccion === 'consejo' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setSeccion('consejo')}
        >
          Consejo Suplementario
        </button>
        <button
          className={`btn ${seccion === 'rutina' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setSeccion('rutina')}
        >
          Rutina de Entrenamiento
        </button>
      </div>

      {/* Contenido segun seleccion */}
      {seccion === 'consejo' && (
        <div className="card p-4 shadow-sm border-0 bg-light">
          <h4 className="fw-bold mb-3">Consejo Suplementario</h4>
          <p className="mb-0">
            La creatina sirve para aumentar la fuerza, potencia y rendimiento muscular durante los entrenamientos. Se recomienda tomar entre 3 a 5 gramos diarios de manera constante.
          </p>
        </div>
      )}

      {seccion === 'rutina' && (
        <div className="card p-4 shadow-sm border-0 bg-light">
          <h4 className="fw-bold mb-3">Rutina Semanal Recomendada</h4>
          <ul className="list-group list-group-flush bg-transparent">
            <li className="list-group-item bg-transparent">
              <strong>Lunes y Jueves:</strong> Espalda y Biceps (4 series por ejercicio, 10 a 12 repeticiones).
            </li>
            <li className="list-group-item bg-transparent">
              <strong>Martes y Viernes:</strong> Pecho y Triceps (4 series por ejercicio, 10 a 12 repeticiones).
            </li>
            <li className="list-group-item bg-transparent">
              <strong>Miercoles y Sabado:</strong> Piernas y Hombros (4 series por ejercicio, 10 a 12 repeticiones).
            </li>
          </ul>
        </div>
      )}

      {/* Video Corporativo */}
      <div className="text-center my-5">
        <h3 className="fw-bold mb-2">Video Corporativo FitLab</h3>
        <p className="text-muted mb-4">Conoce nuestras instalaciones y estandares de calidad.</p>
        <div className="ratio ratio-16x9 mx-auto rounded-3 overflow-hidden shadow-lg" style={{ maxWidth: '850px' }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Video Corporativo FitLab"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Infcorp;