import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importa ícones bonitos

import { ProductsProvider } from "./src/utils/ProductsContext";
import HomeScreen from "./src/screens/HomeScreen";
import AddProductScreen from "./src/screens/AddProductScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ProductsProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = "cart-outline";
                } else if (route.name === "AddProduto") {
                  iconName = "plus-box";
                } else if (route.name === "Consultar") {
                  iconName = "magnify"; // Ícone para a tela Consultar (lupa)
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
            <Tab.Screen name="Consutar" component={HomeScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ProductsProvider>
  );
}
