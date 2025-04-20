import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";


export default function HomeListScreen() {
  const { products, addProduct } = useContext(ProductsContext); // Pegando os produtos e a função de adicionar do contexto

  // Estado local para armazenar os dados do novo produto
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Função para adicionar o produto
  const handleAddProduct = () => {
    if (name && price && quantity) {
      const newProduct = {
        id: String(products.length + 1), // Gerando um id simples baseado no comprimento da lista
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      };
      addProduct(newProduct); // Adiciona o produto ao contexto
      setName(""); // Limpa os campos após adicionar
      setPrice("");
      setQuantity("");
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productText}>Nome: {item.name}</Text>
      <Text style={styles.productText}>Preço: R$ {item.price.toFixed(2)}</Text>
      <Text style={styles.productText}>Quantidade: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.heading}>📝 Lista de Compras em Casa</Text>

      {/* Formulário para adicionar um produto */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantity}
          keyboardType="numeric"
          onChangeText={setQuantity}
        />
        <Button title="Adicionar Produto" onPress={handleAddProduct} />
      </View>

      {/* Lista de produtos */}
      <FlatList
        data={products} // Exibindo os produtos do contexto
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  productItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  productText: {
    fontSize: 14,
  },
});
