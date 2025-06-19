import { StyleSheet } from "react-native";
import { colors } from "./colors";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white || "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: colors.lightText,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  menuButton: {
    position: "absolute",
    left: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  flatListContent: {
    paddingBottom: 100,
    paddingHorizontal: 5,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: colors.lightGray,
  },
  noImage: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0e7df",
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "700",
    marginBottom: 5,
  },
  productBarcode: {
    fontSize: 14,
    color: colors.lightGray,
    marginBottom: 3,
  },
  productCategory: {
    fontSize: 14,
    color: colors.accent,
    fontStyle: "italic",
  },

  deleteButton: {
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    marginVertical: 10,
    borderRadius: 15,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
