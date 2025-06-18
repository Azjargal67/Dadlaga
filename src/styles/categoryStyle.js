import { StyleSheet } from "react-native";
import { colors } from "./colors";

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.background,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  overlay: {
    flex: 1,
    paddingTop: 8,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  productBarcode: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  deleteButton: {
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.purple500,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    // Хаагдахыг зөвшөөрөхийн тулд touch event-ийг зогсооно
    // modalContent доторх элементүүдэд touch event зөв ажиллах болно
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12, // Товчлууруудын хоорондын зай
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100, // Товчны хэмжээг тодорхой болгох
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: colors.secondary,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
