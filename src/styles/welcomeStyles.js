import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./colors";

const { width, height } = Dimensions.get("window");

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.06,
  },
  title: {
    color: colors.dark,
    fontWeight: "800",
    fontSize: width * 0.09,
    textAlign: "center",
    marginBottom: height * 0.02,
    letterSpacing: 0.8,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.08,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: height * 0.015,
  },
  buttonText: {
    color: colors.dark,
    fontWeight: "700",
    fontSize: width * 0.045,
    letterSpacing: 0.5,
  },
  loginLink: {
    paddingVertical: height * 0.015,
    width: "75%",
    alignItems: "center",
  },
  loginLinkText: {
    color: colors.accent,
    fontWeight: "600",
    fontSize: width * 0.04,
    textDecorationLine: "underline",
    letterSpacing: 0.4,
  },
  spacer: {
    height: height * 0.03,
  },
});
