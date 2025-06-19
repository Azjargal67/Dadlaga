import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
    flexGrow: 1,
  },

  imagePicker: {
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.gray,
      marginBottom: 8,
    },
    imageInput: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      height: 300,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: colors.lightGray,
    },
    imagePreview: {
      width: "100%",
      height: "100%",
      borderRadius: 8,
      resizeMode: "cover",
    },
    placeholderText: {
      fontSize: 14,
      color: colors.gray,
      marginTop: 8,
    },
  },

  inputField: {
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.gray,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.black,
      marginBottom: 16,
    },
  },

  categorySelector: {
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.gray,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      justifyContent: "center",
    },
    categoryText: {
      fontSize: 16,
      color: colors.black,
    },
    placeholderCategoryText: {
      fontSize: 16,
      color: "#ccc",
    },
  },

  addButton: {
    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      padding: 16,
      alignItems: "center",
      marginVertical: 16,
    },
    disabledButton: {
      backgroundColor: colors.gray,
      opacity: 0.6,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.white,
    },
  },

  categoryModal: {
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.)",
    },
    modalContainer: {
      justifyContent: "flex-end",
      borderColor: colors.primary,
    },
    modalContent: {
      backgroundColor: colors.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20,
      maxHeight: "300%",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.primary,
      marginBottom: 16,
    },
    categoryItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGray,
    },
    categoryItemText: {
      fontSize: 16,
      color: colors.primary,
    },
    noCategoriesText: {
      fontSize: 14,
      color: colors.gray,
      textAlign: "center",
      marginVertical: 16,
    },
    newCategoryContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
    },
    newCategoryInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 15,
      padding: 12,
      fontSize: 16,
      marginRight: 8,
      backgroundColor: colors.white,
    },
    addCategoryButton: {
      backgroundColor: colors.purple500,
      borderRadius: 8,
      padding: 12,
    },
    addCategoryButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.white,
    },
  },
});
