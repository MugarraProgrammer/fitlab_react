import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RutaProtegida from './components/RutaProtegida';
import { AuthProvider } from './context/AuthContext';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: nuevaCantidad } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header cart={cart} />
        <main>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <RutaProtegida rolRequerido="ADMIN">
                  <Admin />
                </RutaProtegida>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;