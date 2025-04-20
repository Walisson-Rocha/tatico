import React, { useState, useContext, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Alert, 
  Image, 
  StyleSheet,
  Text,
  Animated
} from 'react-native';
import { Card } from 'react-native-paper';
import { ProductsContext } from '../utils/ProductsContext';

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { addProduct } = useContext(ProductsContext);

  // Imagens para o carrossel
  const bannerImages = [
    'https://www.pratofino.com.br/wp-content/uploads/2022/09/banner-premios.png',
    'https://img.cdndsgni.com/preview/10769184.jpg',
    'https://taticobaratotododia.com.br/bsb/wp-content/uploads/2024/10/BANNER-TATICO.jpg.webp'
  ];

  // Efeito para trocar as imagens automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % bannerImages.length
        );
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

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

    setName('');
    setPrice('');
    setQuantity('1');
    navigation.navigate('Home');
  };

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

      {/* Carrossel de Imagens */}
      <Card style={styles.carouselCard}>
        <Animated.Image 
          source={{ uri: bannerImages[currentImageIndex] }} 
          style={[styles.carouselImage, { opacity: fadeAnim }]}
          resizeMode="cover"
        />
      </Card>

      <TextInput
        placeholder="Nome do produto"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço (ex: 5.99)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Adicionar Produto" 
          onPress={handleAddProduct} 
          color="#000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'white',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  carouselCard: {
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});