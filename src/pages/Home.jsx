import React from 'react';
import Catalog from '../components/Catalog';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold">Bienvenidos a FitLab</h1>
          <p className="lead text-muted">
            Encuentra los mejores productos e implementos deportivos para tu entrenamiento.
          </p>
        </div>
      </section>

      <main className="container my-4">
        <Catalog />
      </main>
    </div>
  );
}