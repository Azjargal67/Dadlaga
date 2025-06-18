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
import { addItem, removeItem, updateQuantity } from "../../redux/cartSlice";
import styles from "../../styles/SalesScreenStyle";

export default function SalesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getPriceByProductName = (productName) => {
    // uniin medeelel baihgui bol 0 iig butsaana
    const priceMap = {
      Бараа1: 1500,
      Бараа2: 2000,
      Бараа3: 1000,
    };
    return priceMap[productName] ?? 1000;
  };

  const handleAddToCart = () => {
    if (!searchQuery.trim() || !quantity.trim()) {
      Alert.alert("Анхаар", "Бүх талбарыг бөглөнө үү");
      return;
    }

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      Alert.alert("Анхаар", "Барааны тоог зөв оруулна уу");
      return;
    }

    const price = getPriceByProductName(searchQuery);
    const newItem = {
      id: Date.now().toString(),
      name: searchQuery,
      quantity: parsedQuantity,
      price: price,
      total: price * parsedQuantity,
      imageBase64: null,
    };

    dispatch(addItem(newItem));
    setSearchQuery("");
    setQuantity("");
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
    if (!quantity.trim()) {
      Alert.alert("Анхаар", "Тоо ширхэг оруулна уу");
      return;
    }

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      Alert.alert("Анхаар", "Тоо ширхэг зөв оруулна уу");
      return;
    }

    dispatch(updateQuantity({ id: selectedItem.id, quantity: parsedQuantity }));
    setModalVisible(false);
    setSearchQuery("");
    setQuantity("");
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
            onPress={(e) => {
              e.stopPropagation();
              decreaseQuantity(item.id);
            }}
            style={styles.quantityButton}
          >
            <Icon name="minus" size={20} color="#6A1B9A" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              increaseQuantity(item.id);
            }}
            style={styles.quantityButton}
          >
            <Icon name="plus" size={20} color="#6A1B9A" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            dispatch(removeItem(item.id));
          }}
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
              placeholder="Бараа хайх / barcode уншуулах"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleAddToCart}
              returnKeyType="done"
            />

            <TouchableOpacity
              style={styles.barcodeButton}
              onPress={() => Alert.alert("Barcode scanner идэвхжлээ")}
            >
              <Icon name="barcode-scan" size={24} color="#6A1B9A" />
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
              onPress={() => Alert.alert("Баримт хадгалагдлаа")}
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
            <Text style={styles.modalTitle}>Тоо ширхэг өөрчлөх</Text>
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
