import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from "../../redux/cartSlice";
import styles from "../../styles/SalesScreenStyle";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 👈 нэмэгдсэн

export default function SalesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBarcodeSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Barcode оруулна уу");
      return;
    }

    try {
      const q = query(
        collection(db, "products"),
        where("barcode", "==", searchQuery.trim())
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert("Ийм barcode-тэй бараа байхгүй байна");
        return;
      }

      snapshot.forEach((doc) => {
        const d = doc.data();
        const newItem = {
          id: doc.id,
          name: d.name,
          quantity: 1,
          price: d.price ?? 1000,
          total: d.price ?? 1000,
          imageBase64: d.imageBase64 ?? null,
        };
        dispatch(addItem(newItem));
      });

      setSearchQuery("");
      Alert.alert("Амжилттай", "Бараа сагсанд нэмэгдлээ");
    } catch (e) {
      console.error("Barcode хайх үед алдаа:", e);
      Alert.alert("Алдаа", "Хайлтын үед алдаа гарлаа");
    }
  };

  const increaseQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const decreaseQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const openQuantityEdit = (item) => {
    setSelectedItem(item);
    setQuantity(item.quantity.toString());
    setSearchQuery(item.name);
    setModalVisible(true);
  };

  const updateQuantityFromModal = () => {
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      Alert.alert("Анхаар", "Барааны тоог зөв оруулна уу");
      return;
    }

    dispatch(updateQuantity({ id: selectedItem.id, quantity: parsedQuantity }));
    setModalVisible(false);
    setSearchQuery("");
    setQuantity("");
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Alert.alert("Анхаар", "Сагс хоосон байна");
      return;
    }

    // ⬇️ Хэрэглэгчийн ID-г авах
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Алдаа", "Нэвтэрсэн хэрэглэгч байхгүй байна");
      return;
    }

    const saleId = Date.now().toString();
    const dateObj = new Date();
    const formattedDate = dateObj
      .toISOString()
      .split("T")[0]
      .replace(/-/g, ".");
    const totalAmount = cart.reduce((sum, item) => sum + (item.total ?? 0), 0);

    const billData = {
      saleId,
      date: formattedDate,
      totalAmount,
      userId: user.uid, // ✅ хэрэглэгчийн ID-г оруулсан
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        time: new Date().toLocaleTimeString("en-GB"),
      })),
    };

    try {
      await addDoc(collection(db, "bills"), billData);
      Alert.alert("Амжилттай", "Баримт хадгалагдлаа");
      dispatch(clearCart());
    } catch (error) {
      console.error("Баримт хадгалахад алдаа:", error);
      Alert.alert("Алдаа", "Баримт хадгалахад алдаа гарлаа");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openQuantityEdit(item)}>
      <View style={styles.cartItem}>
        {item.imageBase64 ? (
          <Image
            source={{ uri: item.imageBase64 }}
            style={styles.productImage}
          />
        ) : (
          <View style={[styles.productImage, styles.noImage]}>
            <Icon name="image-off" size={30} color="#6A1B9A" />
          </View>
        )}
        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.itemPrice}>
            {(item.price ?? 0).toLocaleString()}₮
          </Text>
          <Text style={styles.itemTotal}>
            {(item.total ?? 0).toLocaleString()}₮
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Icon name="minus" size={20} color="#6A1B9A" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Icon name="plus" size={20} color="#6A1B9A" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => dispatch(removeItem(item.id))}
          style={styles.removeButton}
        >
          <Icon name="close" size={20} color="#6A1B9A" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Барааны баркод оруулаад Enter товч дарна уу"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleBarcodeSearch}
              returnKeyType="search"
            />
            <TouchableOpacity
              style={styles.barcodeButton}
              onPress={() => Alert.alert("odoohondoo hiigeegui baigaa")}
            >
              <Icon name="barcode-scan" size={24} color="#2C3E50" />
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.push("CartProductList")}
            >
              <Text style={styles.actionButtonText}>Бараа</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.payButton]}
              onPress={handleCheckout}
            >
              <Text style={styles.actionButtonText}>Төлөх</Text>
            </TouchableOpacity>
          </View>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Icon name="cart-remove" size={60} color="#999" />
            <Text style={styles.emptyCartText}>
              Сагсанд бараа байхгүй байна
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={cart}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.cartList}
              contentContainerStyle={styles.cartListContent}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Нийт:{" "}
                {cart
                  .reduce((sum, item) => sum + (item.total ?? 0), 0)
                  .toLocaleString()}
                ₮
              </Text>
            </View>
          </>
        )}
      </KeyboardAvoidingView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Барааны тоог өөрчлөх</Text>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Тоо ширхэг"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={updateQuantityFromModal}
                style={[styles.modalButton, styles.saveButton]}
              >
                <Text style={styles.modalButtonText}>Хадгалах</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.modalButtonText}>Болих</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
