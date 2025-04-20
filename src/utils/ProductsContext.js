import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Função para adicionar produto
  const addProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  // Função para remover produto
  const removeProduct = (productId) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  // Cálculo do total
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
