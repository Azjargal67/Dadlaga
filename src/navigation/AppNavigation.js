import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import WelcomeScreen from "../screens/userAccess/WelcomeScreen";
import LoginScreen from "../screens/userAccess/Login";
import SignUpScreen from "../screens/userAccess/SignUp";
import SalesScreen from "../screens/sales/SalesScreen";
import ProductListScreen from "../screens/productList/ProductListScreen";
import ProductAddScreen from "../screens/productList/ProductAddScreen";
import ProductDetailScreen from "../screens/productList/ProductDetailScreen";
import BillScreen from "../screens/bill/BillScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import CategoryScreen from "../screens/productList/CategoryScreen";
import { colors } from "../styles/colors";
import CartProductList from "../screens/sales/CartProductList";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ProductDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="ProductList"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Бараа" }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoryScreen}
        options={{ title: "Ангилалууд" }}
      />
    </Drawer.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === "Sales") {
            return (
              <MaterialIcons
                name={focused ? "bar-chart" : "bar-chart"}
                size={24}
                color={color}
              />
            );
          } else if (route.name === "Products") {
            return (
              <Ionicons
                name={focused ? "cube" : "cube-outline"}
                size={24}
                color={color}
              />
            );
          } else if (route.name === "Bills") {
            return (
              <Ionicons
                name={focused ? "document-text" : "document-text-outline"}
                size={24}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: colors.purple500 || "#4A2C2A",
        tabBarInactiveTintColor: colors.purple300 || "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white || "#fff",
          borderTopWidth: 1,
          borderTopColor: colors.purple100 || "#e0e0e0",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontWeight: "500",
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}
    >
      <Tab.Screen
        name="Sales"
        component={SalesScreen}
        options={{ title: "Борлуулалт" }}
      />
      <Tab.Screen
        name="Products"
        component={ProductDrawerNavigator}
        options={{ title: "Бараа" }}
      />
      <Tab.Screen
        name="Bills"
        component={BillScreen}
        options={{ title: "Баримт" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Профайл" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductAddScreen"
          component={ProductAddScreen}
          options={{ headerShown: false, title: "Бараа Нэмэх" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ headerShown: false, title: "Барааны дэлгэрэнгүй" }}
        />
        <Stack.Screen
          name="CartProductList"
          component={CartProductList}
          options={{ headerShown: false, title: "Сагс дахь бараа" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
