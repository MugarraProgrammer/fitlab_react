import React from 'react';
import Catalog from '../components/Catalog';

function Home({ addToCart }) {
  return (
    <div className="container py-4">
      <Catalog addToCart={addToCart} />
    </div>
  );
}

export default Home;