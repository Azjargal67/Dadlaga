import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import authStyles from "../../styles/authStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const validateEmail = (value) => {
    setForm((prev) => ({ ...prev, email: value }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Буруу имэйл хаяг байна.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (value) => {
    setForm((prev) => ({ ...prev, password: value }));
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;

    if (!hasUpperCase || !hasSpecialChar || !isLongEnough) {
      setPasswordError(
        "Нууц үг нь 8-с дээш тэмдэгт, 1 том үсэг, 1 тусгай тэмдэгт агуулсан байх ёстой."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextField = (nextRef) => {
    nextRef.current?.focus();
  };

  const handleSignUp = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert("Алдаа", "Бүх талбарыг бөглөнө үү!");
      return;
    }

    if (emailError || passwordError) {
      Alert.alert("Алдаа", "Мэдээллээ зөв оруулна уу.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Алдаа", "Нууц үг таарахгүй байна!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        createdAt: new Date(),
      });

      Alert.alert("Амжилттай", "Бүртгэл амжилттай боллоо!");
      navigation.navigate("Login");
    } catch (error) {
      let errorMessage = "Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Энэ имэйл хаяг аль хэдийн бүртгэгдсэн байна.";
          break;
        case "auth/invalid-email":
          errorMessage = "Имэйл хаяг буруу байна.";
          break;
        case "auth/weak-password":
          errorMessage =
            "Нууц үг хэтэрхий сул байна. 8-аас дээш тэмдэгт оруулна уу.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Сүлжээний алдаа. Интернэт холболтоо шалгана уу.";
          break;
        default:
          errorMessage = error.message;
      }

      Alert.alert("Алдаа", errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={authStyles.keyboardAvoidingView}
    >
      <ScrollView
        contentContainerStyle={authStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView>
          <View style={authStyles.overlay}>
            <Text style={authStyles.title}>Бүртгүүлэх</Text>

            <TextInput
              style={authStyles.input}
              placeholder="Нэр"
              value={form.name}
              onChangeText={(text) => handleFieldChange("name", text)}
              returnKeyType="next"
              onSubmitEditing={() => handleNextField(emailRef)}
            />

            <TextInput
              ref={emailRef}
              style={authStyles.input}
              placeholder="Имэйл"
              value={form.email}
              onChangeText={validateEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => handleNextField(phoneRef)}
            />
            {emailError ? (
              <Text style={authStyles.errorText}>{emailError}</Text>
            ) : null}

            <TextInput
              ref={phoneRef}
              style={authStyles.input}
              placeholder="Утасны дугаар"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(text) => handleFieldChange("phone", text)}
              returnKeyType="next"
              onSubmitEditing={() => handleNextField(passwordRef)}
            />

            <TextInput
              ref={passwordRef}
              style={authStyles.input}
              placeholder="Нууц үг"
              secureTextEntry
              value={form.password}
              onChangeText={validatePassword}
              returnKeyType="next"
              onSubmitEditing={() => handleNextField(confirmPasswordRef)}
            />
            {passwordError ? (
              <Text style={authStyles.errorText}>{passwordError}</Text>
            ) : null}

            <TextInput
              ref={confirmPasswordRef}
              style={authStyles.input}
              placeholder="Нууц үг баталгаажуулах"
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={(text) =>
                handleFieldChange("confirmPassword", text)
              }
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
            />

            <TouchableOpacity style={authStyles.button} onPress={handleSignUp}>
              <Text style={authStyles.buttonText}>Бүртгүүлэх</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={authStyles.link}>Нэвтрэх</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
