import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Importe os Providers
import { ProductsProvider } from "./src/utils/ProductsContext";
import { ProductsProvider2 } from "./src/utils/ProductsContext2";

// Importe todas as telas
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AddProductScreen from "./src/screens/AddProductScreen";
import HomeListScreen from "./src/screens/HomeListScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Componente das abas principais (após login)
function MainTabs() {
  return (
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
  );
}

// Componente principal de navegação
function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainApp" component={MainTabs} />
    </Stack.Navigator>
  );
}

// Componente App principal
export default function App() {
  return (
    <ProductsProvider>
      <ProductsProvider2>
        <PaperProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </ProductsProvider2>
    </ProductsProvider>
  );
}