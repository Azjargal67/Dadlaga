import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../styles/addProductStyle";
import { colors } from "../../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const ImagePickerComponent = ({ image, setImage, styles }) => {
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Зөвшөөрөл шаардлагатай",
          "Зураг сонгохын тулд зөвшөөрөл өгнө үү"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, //mediaTypes: [ImagePicker.MediaType.IMAGE] ingej solij boloh uguig sudlah
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        if (selectedImage.base64) {
          const base64Image = `data:${
            selectedImage.type || "image/jpeg"
          };base64,${selectedImage.base64}`;
          setImage(base64Image);
        } else {
          Alert.alert("Алдаа", "Зурагны өгөгдөл олдсонгүй");
        }
      }
    } catch (error) {
      console.error("Зураг сонгоход алдаа:", error);
      Alert.alert("Алдаа", "Зураг сонгоход алдаа гарлаа");
    }
  };

  return (
    <View>
      <Text style={styles.imagePicker.label}>Зураг</Text>
      <TouchableOpacity
        style={styles.imagePicker.imageInput}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.imagePicker.imagePreview}
          />
        ) : (
          <>
            <Ionicons name="image-outline" size={40} color={colors.primary} />
            <Text style={styles.imagePicker.placeholderText}>
              Зураг оруулах
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

// InputField
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  returnKeyType,
  inputRef,
  onSubmitEditing,
  autoCapitalize,
  styles,
}) => (
  <View>
    <Text style={styles.inputField.label}>{label}</Text>
    <TextInput
      ref={inputRef}
      style={styles.inputField.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCapitalize={autoCapitalize}
    />
  </View>
);

// CategorySelector
const CategorySelector = ({ category, onPress, styles }) => (
  <View>
    <Text style={styles.categorySelector.label}>Ангилал</Text>
    <TouchableOpacity style={styles.categorySelector.input} onPress={onPress}>
      <Text
        style={
          category
            ? styles.categorySelector.categoryText
            : styles.categorySelector.placeholderCategoryText
        }
      >
        {category || "Ангилал сонгох"}
      </Text>
    </TouchableOpacity>
  </View>
);

const AddButton = ({ loading, onPress, styles }) => (
  <TouchableOpacity
    style={[
      styles.addButton.button,
      loading && styles.addButton.disabledButton,
    ]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color={colors.white} />
    ) : (
      <Text style={styles.addButton.buttonText}>Нэмэх</Text>
    )}
  </TouchableOpacity>
);

const CategoryModal = ({
  visible,
  onClose,
  categories,
  onSelectCategory,
  newCategory,
  setNewCategory,
  onAddNewCategory,
  newCategoryRef,
  styles,
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 20}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View style={styles.categoryModal.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.categoryModal.modalContainer}>
        <View style={styles.categoryModal.modalContent}>
          <Text style={styles.categoryModal.modalTitle}>Ангилал сонгох</Text>
          <FlatList
            data={categories}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryModal.categoryItem}
                onPress={() => onSelectCategory(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryModal.categoryItemText}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.categoryModal.noCategoriesText}>
                Ангилал байхгүй
              </Text>
            }
            style={{ maxHeight: 250 }}
          />
          <View style={styles.categoryModal.newCategoryContainer}>
            <TextInput
              ref={newCategoryRef}
              style={styles.categoryModal.newCategoryInput}
              value={newCategory}
              onChangeText={setNewCategory}
              placeholder="Шинэ ангилал нэр"
              onSubmitEditing={onAddNewCategory}
              returnKeyType="done"
              onFocus={() => {}}
            />
            <TouchableOpacity
              style={styles.categoryModal.addCategoryButton}
              onPress={onAddNewCategory}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryModal.addCategoryButtonText}>
                Нэмэх
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export default function ProductAddScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    barcode: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const priceRef = useRef(null);
  const barcodeRef = useRef(null);
  const newCategoryRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchCategories();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const loadedCategories = [];
      querySnapshot.forEach((doc) => {
        loadedCategories.push(doc.data().name);
      });
      setCategories(loadedCategories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextField = (nextRef) => {
    nextRef.current?.focus();
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.price || !form.barcode || !form.category) {
      Alert.alert("Анхаар!", "Бүх талбарыг бөглөнө үү");
      return;
    }

    if (isNaN(parseFloat(form.price))) {
      Alert.alert("Анхаар!", "Үнэ зөв тоо байх ёстой");
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: form.name.trim(),
        price: parseFloat(form.price),
        barcode: form.barcode.trim(),
        category: form.category.trim(),
        createdAt: new Date(),
      };

      if (image) {
        productData.imageBase64 = image;
      }

      const docRef = await addDoc(collection(db, "products"), productData);
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Амжилттай", "Бараа амжилттай нэмэгдлээ");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Алдаа", error.message || "Бараа нэмэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (category) => {
    handleChange("category", category);
    setShowCategoryModal(false);
  };

  const handleAddNewCategory = async () => {
    if (newCategory.trim()) {
      if (categories.includes(newCategory.trim())) {
        Alert.alert("Анхаар!", "Ангилал аль хэдийн байна");
        return;
      }
      try {
        await addDoc(collection(db, "categories"), {
          name: newCategory.trim(),
          createdAt: new Date(),
        });

        setCategories((prev) => [...prev, newCategory.trim()]);
        handleChange("category", newCategory.trim());
        setNewCategory("");
        setShowCategoryModal(false);
      } catch (error) {
        console.error("Error adding new category: ", error);
        Alert.alert("Алдаа", "Шинэ ангилал нэмэхэд алдаа гарлаа");
      }
    }
  };

  const handleOpenCategoryModal = () => {
    setShowCategoryModal(true);
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <SafeAreaView>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <ImagePickerComponent
            image={image}
            setImage={setImage}
            styles={styles}
          />

          <InputField
            label="Барааны нэр"
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Барааны нэр"
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => handleNextField(priceRef)}
            styles={styles}
          />

          <InputField
            label="Үнэ"
            value={form.price}
            onChangeText={(text) => handleChange("price", text)}
            placeholder="Үнэ"
            keyboardType="decimal-pad"
            returnKeyType="next"
            inputRef={priceRef}
            onSubmitEditing={() => handleNextField(barcodeRef)}
            styles={styles}
          />

          <InputField
            label="Баркод"
            value={form.barcode}
            onChangeText={(text) => handleChange("barcode", text)}
            placeholder="Баркод"
            keyboardType="numeric"
            returnKeyType="next"
            inputRef={barcodeRef}
            onSubmitEditing={handleOpenCategoryModal}
            styles={styles}
          />

          <CategorySelector
            category={form.category}
            onPress={handleOpenCategoryModal}
            styles={styles}
          />

          <AddButton
            loading={loading}
            onPress={handleAddProduct}
            styles={styles}
          />

          <CategoryModal
            visible={showCategoryModal}
            onClose={() => setShowCategoryModal(false)}
            categories={categories}
            onSelectCategory={handleSelectCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            onAddNewCategory={handleAddNewCategory}
            newCategoryRef={newCategoryRef}
            styles={styles}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
