import React, { useContext, useState } from "react";
import { View,Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ScrollView} from "react-native";
import { Card } from "react-native-paper";
import { ProductsContext2 } from "../utils/ProductsContext2";

export default function HomeListScreen() {
  const { products, addProduct, removeProduct, updateProduct } = useContext(ProductsContext2);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const handleAddProduct = () => {
    if (!name || !quantity) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    const quantityNum = parseInt(quantity);

    if (isNaN(quantityNum)) {
      Alert.alert("Erro", "Quantidade inválida!");
      return;
    }

    if (editingId) {
      updateProduct(editingId, {
        name,
        quantity: quantityNum
      });
      setEditingId(null);
    } else {
      addProduct({
        name,
        quantity: quantityNum
      });
    }

    setName("");
    setQuantity("");
  };

  const handleEditProduct = (product) => {
    setName(product.name);
    setQuantity(String(product.quantity));
    setEditingId(product.id);
  };

  const handlePressProduct = (id) => {
    Alert.alert(
      "Remover Produto",
      "Tem certeza que deseja remover este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => removeProduct(id) }
      ]
    );
  };

  const toggleShowAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressProduct(item.id)}>
      <Card style={styles.productCard}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetail}>Quantidade: {item.quantity}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleEditProduct(item)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header com Logo e Nome */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../image/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Lista Mágica</Text>
      </View>

      {/* Seção Minha Lista */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Minha Lista</Text>
        <TouchableOpacity onPress={toggleShowAllProducts}>
          <Text style={styles.seeAll}>
            {showAllProducts ? "Ocultar lista" : "Ver toda lista"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Visualização completa da lista */}
      {showAllProducts && (
        <ScrollView style={styles.fullListContainer}>
          {products.length > 0 ? (
            products.map((product) => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.fullListItem}
                onPress={() => handlePressProduct(product.id)}
              >
                <Text style={styles.fullListName}>{product.name}</Text>
                <Text style={styles.fullListDetails}>
                  {product.quantity} un.
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum produto na lista</Text>
          )}
        </ScrollView>
      )}

      <View style={styles.divider} />

      {/* Formulário de Adição */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite o nome do produto"
        />
        <TextInput
          style={styles.input}
          value={quantity}
          keyboardType="numeric"
          onChangeText={setQuantity}
          placeholder="Digite a quantidade"
        />
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddProduct}
        >
          <Text style={styles.addButtonText}>
            {editingId ? "ATUALIZAR PRODUTO" : "ADICIONAR PRODUTO"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.productList}
        ListHeaderComponent={
          <Text style={styles.productsTitle}>Produtos ({products.length})</Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyList}>Nenhum produto adicionado ainda</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#6200ee',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  formContainer: {
    marginBottom: 25,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  productList: {
    flex: 1,
  },
  productCard: {
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#6200ee',
    padding: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  fullListContainer: {
    maxHeight: 200,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  fullListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fullListName: {
    fontSize: 16,
  },
  fullListDetails: {
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 10,
  },
});