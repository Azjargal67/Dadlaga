import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#4A2C2A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Барааны дэлгэрэнгүй</Text>
        </View>
      </SafeAreaView>

      {product.imageBase64 ? (
        <Image
          source={{ uri: product.imageBase64 }}
          style={styles.productImage}
        />
      ) : (
        <View style={[styles.productImage, styles.noImage]}>
          <Ionicons name="image-outline" size={60} color="#999" />
        </View>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.price}>Үнэ: {product.price}₮</Text>
        <Text style={styles.barcode}>Баркод: {product.barcode}</Text>
        <Text style={styles.category}>Ангилал: {product.category}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#4A2C2A",
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  detailsContainer: {
    padding: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#8B4513",
    marginBottom: 8,
  },
  barcode: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
});

export default ProductDetailScreen;
