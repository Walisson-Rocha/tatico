import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { ProductsContext } from '../utils/ProductsContext';

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');

  const { addProduct } = useContext(ProductsContext);

  const handleAddProduct = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Digite o nome do produto');
      return;
    }

    if (!price || isNaN(parseFloat(price))) {
      Alert.alert('Erro', 'Preço inválido');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity) || 1,
    };

    addProduct(newProduct);

    // Limpa os campos e volta para a tela inicial
    setName('');
    setPrice('');
    setQuantity('1');
    navigation.navigate('Home'); // <- nome correto da tab
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Nome do produto"
        value={name}
        onChangeText={setName}
        style={{
          marginBottom: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
        }}
      />
      <TextInput
        placeholder="Preço (ex: 5.99)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={{
          marginBottom: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
        }}
      />
      <TextInput
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        style={{
          marginBottom: 10,
          padding: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
        }}
      />
      <Button title="Adicionar Produto" onPress={handleAddProduct} />
    </View>
  );
}
