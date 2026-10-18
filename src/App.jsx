import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes globales
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas de src/pages/
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

import './App.css';

export default function App() {
  return (
    <Router>
      <div className="site-wrapper d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1" id="contenido">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}