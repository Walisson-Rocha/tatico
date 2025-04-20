import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const removeProduct = (productId) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  const total = products.reduce((sum, product) => 
    sum + (product.price * product.quantity), 0
  );

  return (
    <ProductsContext.Provider 
      value={{ 
        products, 
        addProduct, 
        removeProduct,
        total 
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}