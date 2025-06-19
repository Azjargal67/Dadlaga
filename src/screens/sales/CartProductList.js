import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { db } from "../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles/colors";
import { addItem } from "../../redux/cartSlice";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartProductList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        Alert.alert("Алдаа", "Бараа татаж чадсангүй.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.barcode && product.barcode.includes(searchQuery))
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        imageBase64: product.imageBase64 || null,
      })
    );
    Alert.alert("Сагсанд нэмэгдлээ", `${product.name} сагсанд нэмэгдлээ!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      {item.imageBase64 ? (
        <Image
          source={{ uri: item.imageBase64 }}
          style={styles.productImage}
          onError={() => console.log("Image load error")}
        />
      ) : (
        <View style={[styles.productImage, styles.noImage]}>
          <Ionicons name="image-outline" size={40} color={colors.lightText} />
        </View>
      )}

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}₮</Text>
          {item.originalPrice && item.originalPrice > item.price && (
            <Text style={styles.originalPrice}>{item.originalPrice}₮</Text>
          )}
        </View>

        <Text style={styles.productBarcode}>Баркод: {item.barcode}</Text>
        <Text style={styles.productCategory} numberOfLines={1}>
          Ангилал: {item.category || "Тодорхойгүй"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Ionicons name="cart-outline" size={24} color={colors.primary} />
      </TouchableOpacity>

      {/* {item.stock && item.stock < 5 && (
        <View style={styles.stockStatus}>
          <Text style={styles.stockStatusText}>
            {item.stock === 0 ? "Дууссан" : `${item.stock} үлдсэн`}
          </Text>
        </View>
      )} */}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Уншиж байна...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Барааны Жагсаалт</Text>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.lightText}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Хайх..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cube-outline"
              size={80}
              color={colors.lightText}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>Бараа олдсонгүй</Text>
            <Text style={styles.emptySubText}>
              Хайлтын үгээ өөрчилж үзнэ үү
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 22,
    color: colors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: "contain",
    backgroundColor: colors.lightGray,
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.lightText,
    textDecorationLine: "line-through",
    marginLeft: 6,
  },
  productBarcode: {
    fontSize: 12,
    color: colors.lightText,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: colors.lightText,
  },
  cartButton: {
    padding: 8,
    marginLeft: 8,
    alignSelf: "center",
  },
  stockStatus: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stockStatusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyImage: {
    opacity: 0.5,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: colors.lightText,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.lightText,
    textAlign: "center",
  },
});
