import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../../firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Swipeable } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import styles from "../../styles/productStyles";
import { colors } from "../../styles/colors";

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const swipeableRefs = useRef(new Map());

  useEffect(() => {
    const unsubscribeProducts = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        Alert.alert("Алдаа", "Бараа татаж чадсангүй.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribeProducts();
      swipeableRefs.current.clear();
    };
  }, []);

  const handleDeleteProduct = async (productId) => {
    Alert.alert("Устгах", "Та энэ барааг устгахдаа итгэлтэй байна уу?", [
      { text: "Цуцлах", style: "cancel" },
      {
        text: "Устгах",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "products", productId));
            setProducts((prev) => prev.filter((p) => p.id !== productId));
            swipeableRefs.current.get(productId)?.close();
          } catch (error) {
            console.error("Delete error:", error);
            Alert.alert("Алдаа", "Устгах үед алдаа гарлаа.");
          }
        },
      },
    ]);
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDeleteProduct(id)}
    >
      <Ionicons name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      ref={(ref) => {
        if (ref) swipeableRefs.current.set(item.id, ref);
      }}
      renderRightActions={() => renderRightActions(item.id)}
      onSwipeableOpen={() => {
        swipeableRefs.current.forEach((ref, id) => {
          if (id !== item.id && ref) ref.close();
        });
      }}
    >
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
      >
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
          <Text style={styles.productPrice}>{item.price}₮</Text>
          <Text style={styles.productBarcode}>Баркод: {item.barcode}</Text>
          <Text style={styles.productCategory} numberOfLines={1}>
            Ангилал: {item.category || "Тодорхойгүй"}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
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
    <ImageBackground style={styles.background} resizeMode="cover">
      <View style={[styles.overlay, { backgroundColor: colors.secondary }]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="menu" size={35} color={colors.purple500} />
          </TouchableOpacity>
          <View style={{ width: 24 }} />
        </View>

        {products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Бараа байхгүй байна</Text>
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
          />
        )}

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate("ProductAddScreen")}
        >
          <Ionicons name="add-circle" size={50} color={colors.white} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
