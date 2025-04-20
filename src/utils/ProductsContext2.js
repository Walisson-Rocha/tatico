// src/utils/ProductsContext2.js
import React, { createContext, useState } from 'react';

export const ProductsContext2 = createContext();

export function ProductsProvider2({ children }) {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, {
      ...product,
      id: Date.now().toString()
    }]);
  };

  const removeProduct = (productId) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, ...updatedData } : product
      )
    );
  };

  const total = products.reduce((sum, product) => 
    sum + (product.price * (product.quantity || 1)), 0
  );

  return (
    <ProductsContext2.Provider 
      value={{ 
        products, 
        addProduct, 
        removeProduct,
        updateProduct,
        total 
      }}
    >
      {children}
    </ProductsContext2.Provider>
  );
}