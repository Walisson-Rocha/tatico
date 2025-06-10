import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
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
    <ProductsContext.Provider 
      value={{ 
        products, 
        addProduct, 
        removeProduct,
        updateProduct,
        total 
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}