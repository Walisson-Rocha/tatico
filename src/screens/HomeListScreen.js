import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ProductsContext } from "../utils/ProductsContext"; // O contexto de produtos

export default function HomeListScreen() {
  const { products } = useContext(ProductsContext); // Pegando os produtos do contexto

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
