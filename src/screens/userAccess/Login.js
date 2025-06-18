import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice"; // loginSuccess биш!
import styles from "../../styles/authStyles";
import { colors } from "../../styles/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const passwordInputRef = useRef(null);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login); // auth биш, login reducer-г хэрэглэж байна

  useEffect(() => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  }, [isLoggedIn]);

  const validateFields = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Имэйл хаяг оруулна уу";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Имэйл хаяг буруу байна";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Нууц үгээ оруулна уу";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Нууц үг дор хаяж 8 тэмдэгт байх ёстой";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      dispatch(
        login({
          uid: user.uid,
          email: user.email,
        })
      );
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Нэвтрэхэд алдаа гарлаа";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Имэйл бүртгэлгүй байна";
          break;
        case "auth/wrong-password":
          errorMessage = "Нууц үг буруу байна";
          break;
        case "auth/too-many-requests":
          errorMessage = "Олон удаа буруу оролдсон. Түр хүлээнэ үү";
          break;
      }
      Alert.alert("Алдаа", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Нэвтрэх</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Имэйл"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <TextInput
                  ref={passwordInputRef}
                  style={styles.passwordInput}
                  placeholder="Нууц үг"
                  secureTextEntry={secureEntry}
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  onPress={() => setSecureEntry(!secureEntry)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={secureEntry ? "eye-off" : "eye"}
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Нэвтрэх</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.linkText}>Бүртгүүлэх</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
