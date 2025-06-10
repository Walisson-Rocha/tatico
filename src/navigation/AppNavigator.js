import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Autenticação
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// Principais
import HomeScreen from "../screens/HomeScreen";
import AddProductScreen from "../screens/AddProductScreen";
import HomeListScreen from "../screens/HomeListScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Configuração das Tabs
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
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0.1,
          shadowRadius: 5,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: "Início" }}
      />
      <Tab.Screen 
        name="AddProduto" 
        component={AddProductScreen} 
        options={{ title: "Adicionar" }}
      />
      <Tab.Screen 
        name="Consultar" 
        component={HomeListScreen} 
        options={{ title: "Consultar" }}
      />
    </Tab.Navigator>
  );
}


export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
      />
      <Stack.Screen 
        name="MainApp" 
        component={MainTabs} 
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}