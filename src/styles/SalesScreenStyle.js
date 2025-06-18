import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  barcodeButton: {
    padding: 6,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#6A1B9A",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#2E7D32",
  },
  emptyCartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#999",
    marginTop: 8,
  },
  cartList: {
    flex: 1,
  },
  cartListContent: {
    paddingBottom: 80,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3E5F5",
    borderRadius: 8,
    marginVertical: 4,
    padding: 8,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  noImage: {
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    color: "#757575",
  },
  itemTotal: {
    color: "#6A1B9A",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  quantityButton: {
    padding: 4,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  removeButton: {
    padding: 4,
  },
  totalContainer: {
    paddingVertical: 10,
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#6A1B9A",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
