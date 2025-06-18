import { StyleSheet } from "react-native";
import { colors } from "./colors";

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkText,
    marginBottom: 16,
    textAlign: "center",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: "cover",
    backgroundColor: colors.lightGray,
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  productBarcode: {
    fontSize: 12,
    color: colors.lightText,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: colors.lightText,
  },
  cartButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.lightText,
  },
});
