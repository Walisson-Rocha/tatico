import React, { useContext, useState, useEffect, useRef } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  TextInput, 
  Image, 
  Animated, 
  StatusBar,
  Platform
} from 'react-native';
import { Card } from 'react-native-paper';
import { ProductsContext } from '../utils/ProductsContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  const { products, total } = useContext(ProductsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bannerImages = [
    'https://taticobaratotododia.com.br/bsb/wp-content/uploads/2024/10/BANNER-INICIAL-4-scaled.jpg.webp',
    'https://taticobaratotododia.com.br/bsb/wp-content/uploads/2025/01/BANNER-Padaria.png',
    'https://taticobaratotododia.com.br/bsb/wp-content/uploads/2024/10/BANNER-TATICO.jpg.webp'
  ];

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

  return (
    <View style={styles.container}>
      {/* Header with Logo and App Name - No white background */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../image/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Lista Mágica</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar produtos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Special Offer */}
      <View style={styles.offerContainer}>
        <Text style={styles.offerTitle}>OFERTA ESPECIAL</Text>
      </View>

      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <Animated.Image 
          source={{ uri: bannerImages[currentImageIndex] }} 
          style={[styles.carouselImage, { opacity: fadeAnim }]}
          resizeMode="cover"
        />
      </View>

      {/* Products Section */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Compra</Text>

        {filteredProducts.map((product) => (
          <Card key={product.id} style={styles.productCard}>
            <Card.Content>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDetail}>Valor: R$ {product.price.toFixed(2)}</Text>
              <Text style={styles.productDetail}>Quantidade: {product.quantity}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Fixed Total */}
      <View style={styles.fixedTotalContainer}>
        <Card style={styles.totalCard}>
          <Card.Content>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  scrollContainer: {
    flex: 1,
    marginBottom: 70,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  offerContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
  },
  carouselContainer: {
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  productCard: {
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDetail: {
    fontSize: 16,
    color: '#666',
  },
  fixedTotalContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  totalCard: {
    backgroundColor: '#000',
    borderRadius: 8,
    elevation: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#ffffff',
  }
});