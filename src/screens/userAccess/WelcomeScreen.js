import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { welcomeStyles } from "../../styles/welcomeStyles";
import { colors } from "../../styles/colors";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={welcomeStyles.container}>
      <View style={welcomeStyles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={welcomeStyles.title}>Let's get started</Text>
        </Animated.View>

        <View style={[welcomeStyles.spacer, { height: 48 }]} />

        <TouchableOpacity
          style={welcomeStyles.button}
          onPress={() => navigation.navigate("SignUp")}
          activeOpacity={0.7}
        >
          <Text style={welcomeStyles.buttonText}>Бүртгүүлэх</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={welcomeStyles.loginLink}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.7}
        >
          <Text style={welcomeStyles.loginLinkText}> Нэвтрэх</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
