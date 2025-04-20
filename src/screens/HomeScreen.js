import React, { useContext } from 'react';
import { View, FlatList, Button, Text } from 'react-native';
import { ProductsContext } from '../utils/ProductsContext';
import ProductItem from '../components/ProductItem';

export default function HomeScreen({ navigation }) {
  const { products, removeProduct, total } = useContext(ProductsContext);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem 
            product={item} 
            onRemove={() => removeProduct(item.id)}
          />
        )}
        keyExtractor={item => item.id}
      />
      
      <Text style={{ 
        fontSize: 18, 
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'right'
      }}>
        Total: R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}