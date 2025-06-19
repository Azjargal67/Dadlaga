import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../../firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/categoryStyle";
import { colors } from "../../styles/colors";

const CategoryItem = React.memo(({ item, onPress, onDelete, productCount }) => (
  <View style={[styles.categoryItem]}>
    <TouchableOpacity
      style={styles.categoryContent}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productBarcode}>
          Энэ ангилалд {productCount(item.name)} бараа байна.
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.lightText} />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onDelete(item.id, item.name)}
      activeOpacity={0.6}
    >
      <Ionicons name="trash-outline" size={20} color={colors.danger} />
    </TouchableOpacity>
  </View>
));

const AddCategoryModal = ({
  visible,
  onClose,
  onSubmit,
  isSubmitting,
  value,
  onChange,
}) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={styles.modalOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Шинэ ангилал нэмэх</Text>
        <TextInput
          style={styles.input}
          placeholder="Ангиллын нэр"
          placeholderTextColor={colors.lightText}
          value={value}
          onChangeText={onChange}
          autoFocus
          maxLength={30}
        />
        <View style={styles.modalActions}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>Болих</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modalButton,
              styles.submitButton,
              isSubmitting && styles.disabledButton,
            ]}
            onPress={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Нэмэх</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const Header = ({ onMenuPress }) => (
  <SafeAreaView edges={["top"]}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={35} color={colors.purple500} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribeCategories = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        setCategories(
          snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching categories:", error);
        Alert.alert("Алдаа", "Ангиллын мэдээлэл татахад алдаа гарлаа.");
        setLoading(false);
      }
    );

    const unsubscribeProducts = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      },
      (error) => {
        console.error("Error fetching products:", error);
        Alert.alert("Алдаа", "Барааны мэдээлэл татахад алдаа гарлаа.");
      }
    );

    return () => {
      unsubscribeCategories();
      unsubscribeProducts();
    };
  }, []);

  const categoryProductCount = useCallback(
    (categoryName) =>
      products.filter((product) => product.category === categoryName).length,
    [products]
  );

  const handleCategoryPress = useCallback(
    (category) =>
      navigation.navigate("CategoryProducts", {
        categoryId: category.id,
        categoryName: category.name,
      }),
    [navigation]
  );

  const handleAddCategory = useCallback(async () => {
    if (!newCategory.trim()) {
      Alert.alert("Алдаа", "Ангиллын нэр оруулна уу!");
      return;
    }

    if (
      categories.some(
        (c) => c.name.toLowerCase() === newCategory.trim().toLowerCase()
      )
    ) {
      Alert.alert("Алдаа", "Энэ нэртэй ангилал аль хэдийн байна!");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "categories"), {
        name: newCategory.trim(),
        createdAt: Date.now(),
      });
      setNewCategory("");
      setModalVisible(false);
      Alert.alert("Амжилттай", "Ангилал амжилттай нэмэгдлээ!");
    } catch (error) {
      console.error("Error adding category:", error);
      Alert.alert("Алдаа", `Ангилал нэмэхэд алдаа гарлаа: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [newCategory, categories]);

  const handleDeleteCategory = useCallback(
    async (categoryId, categoryName) => {
      const productsInCategory = products.filter(
        (p) => p.category === categoryName
      );

      Alert.alert(
        "Ангилал устгах",
        productsInCategory.length > 0
          ? `Энэ ангилалд ${productsInCategory.length} ширхэг бараа байна. Ангилал болон бүх барааг  хамт устгах уу?`
          : "Энэ ангилалыг устгахдаа итгэлтэй байна уу?",
        [
          { text: "Цуцлах", style: "cancel" },
          {
            text: "Устгах",
            style: "destructive",
            onPress: async () => {
              try {
                const batch = writeBatch(db);

                const categoryRef = doc(db, "categories", categoryId);
                batch.delete(categoryRef);

                productsInCategory.forEach((product) => {
                  const productRef = doc(db, "products", product.id);
                  batch.delete(productRef);
                });

                await batch.commit();

                Alert.alert(
                  "Амжилттай",
                  "Ангилал болон холбоотой бараанууд амжилттай устлаа!"
                );
              } catch (error) {
                console.error("Error deleting category and products:", error);
                Alert.alert(
                  "Алдаа",
                  `Ангилал эсвэл бараа устгахад алдаа гарлаа: ${error.message}`
                );
              }
            },
          },
        ]
      );
    },
    [products]
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.emptyText, { marginTop: 10 }]}>
          Ангилал хайж байна...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <Header onMenuPress={() => navigation.openDrawer()} />
      <View style={styles.overlay}>
        <FlatList
          data={categories.sort((a, b) => a.name.localeCompare(b.name))}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              onPress={handleCategoryPress}
              onDelete={handleDeleteCategory}
              productCount={categoryProductCount}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="folder-open-outline"
                size={48}
                color={colors.lightText}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>Ангилал олдсонгүй</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={50} color={colors.white} />
        </TouchableOpacity>
      </View>
      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddCategory}
        isSubmitting={isSubmitting}
        value={newCategory}
        onChange={setNewCategory}
      />
    </View>
  );
}
