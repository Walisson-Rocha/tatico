import React from "react";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ProductsProvider } from "./src/utils/ProductsContext";
import HomeScreen from "./src/screens/HomeScreen";
import AddProductScreen from "./src/screens/AddProductScreen";
import ImageCarousel from "./src/components/ImageCarousel"; 
import HomeListScreen from "./src/screens/HomeListScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const imagens = [
    "https://taticobaratotododia.com.br/bsb/wp-content/uploads/2024/10/BANNER-INICIAL-4-scaled.jpg.webp",
    "https://taticobaratotododia.com.br/bsb/wp-content/uploads/2025/01/BANNER-Padaria.png",
    "https://taticobaratotododia.com.br/bsb/wp-content/uploads/2024/10/BANNER-TATICO.jpg.webp",
    "https://taticobaratotododia.com.br/bsb/wp-content/uploads/2025/01/banner-comunicado-desk.jpg",
    "https://taticobaratotododia.com.br/bsb/wp-content/uploads/2025/02/BANNER-INICIAL-scaled.jpg",
  ];

  return (
    <ProductsProvider>
      <PaperProvider>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <ImageCarousel images={imagens} />

            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;

                  if (route.name === "Home") {
                    iconName = "cart-outline";
                  } else if (route.name === "AddProduto") {
                    iconName = "plus-box";
                  } else if (route.name === "Consultar") {
                    iconName = "magnify";
                  }

                  return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#6200ee",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="AddProduto" component={AddProductScreen} />
              <Tab.Screen name="Consultar" component={HomeListScreen} />
            </Tab.Navigator>
          </View>
        </NavigationContainer>
      </PaperProvider>
    </ProductsProvider>
  );
}
