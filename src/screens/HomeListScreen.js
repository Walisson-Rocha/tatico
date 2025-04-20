import React, { useContext, useState } from "react";
import {View,Text,TextInput,FlatList,StyleSheet,Alert,TouchableOpacity,} from "react-native";
import { ProductsContext } from "../utils/ProductsContext";

export default function HomeListScreen() {
  const { products, addProduct, removeProduct } = useContext(ProductsContext);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddProduct = () => {
    if (name && quantity) {
      const quantityNum = parseInt(quantity);
      if (isNaN(quantityNum)) {
        Alert.alert("Erro", "Quantidade inválida!");
        return;
      }

      const newProduct = {
        id: String(Date.now()), // Garante IDs únicos
        name,
        quantity: quantityNum,
      };

      addProduct(newProduct);
      setName("");
      setQuantity("");
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
    }
  };

  const handleRemoveProduct = (id) => {
    removeProduct(id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
      <View style={styles.productItem}>
        <Text style={styles.productText}>Nome: {item.name}</Text>
        <Text style={styles.productText}>Quantidade: {item.quantity}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.heading}>📝 Lista de Compras</Text>

      {/* Formulário */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantity}
          keyboardType="numeric"
          onChangeText={setQuantity}
        />
        <TouchableOpacity style={styles.addButton} >
          <Text style={styles.addButtonText}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={products}
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
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  productItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  productText: {
    fontSize: 14,
  },
});
