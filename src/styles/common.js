// styles/common.js
import { StyleSheet } from "react-native";
import colors from "./colors";

export const commonStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: colors.white,
    height: 50,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 10,
    marginLeft: "10%",
    alignSelf: "flex-start",
  },
});
