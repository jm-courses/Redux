import React from 'react';
import Product from './Product';

function ProductsList({ products }) {
  return (
    <div className="products-container">
      {products.map((product, index) => (
        <Product key={index} product={product}>
          <form>
            Quantity : <input type="number" min="1" step="1" defaultValue="1" required style={{ width: '30px' }} />
            <br />
            <button type="submit">Add to basket</button>
          </form>
        </Product>
      ))}
    </div>
  );
}

export default ProductsList;
