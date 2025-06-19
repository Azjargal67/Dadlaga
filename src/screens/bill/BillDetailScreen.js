import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

// Жишээ өгөгдөл
const sampleBill = {
  saleId: "12345",
  date: "2025-06-19",
  totalAmount: 16000,
  items: [
    { id: "1", name: "Кофе", quantity: 2, price: 5000, total: 10000 },
    { id: "2", name: "Цай", quantity: 1, price: 3000, total: 3000 },
    { id: "3", name: "Сэндвич", quantity: 1, price: 3000, total: 3000 },
  ],
};

export default function BillDetailScreen({ route, navigation }) {
  const bill = route?.params?.bill || sampleBill;

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Text style={styles.cell}>{item.price.toLocaleString()}</Text>
      <Text style={styles.cell}>{item.total.toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Буцах"
        >
          <Icon name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Баримт / #{bill.saleId}</Text>
      </View>

      <Text style={styles.metaText}>Талон №: #{bill.saleId}</Text>
      <Text style={styles.metaText}>
        Огноо: {bill.date} {bill.items[0]?.time || ""}
      </Text>

      <View style={styles.tableHeader}>
        <Text
          style={[
            styles.cell,
            { flex: 2, color: "#FFFFFF", fontWeight: "600" },
          ]}
        >
          Бараа
        </Text>
        <Text style={[styles.cell, { color: "#FFFFFF", fontWeight: "600" }]}>
          Тоо
        </Text>
        <Text style={[styles.cell, { color: "#FFFFFF", fontWeight: "600" }]}>
          Үнэ
        </Text>
        <Text style={[styles.cell, { color: "#FFFFFF", fontWeight: "600" }]}>
          Нийт дүн
        </Text>
      </View>

      <FlatList
        data={bill.items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Нийт</Text>
        <Text style={styles.totalAmount}>
          {bill.totalAmount.toLocaleString()}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    padding: 8, // Иконд зориулж жижигрүүлсэн
    backgroundColor: "#1E3A8A",
    borderRadius: 6,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    fontFamily: "Inter-Bold", // Хэрэв фонт байхгүй бол хас
  },
  metaText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#6B7280",
    fontFamily: "Inter-Regular",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#1E3A8A",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#1F2937",
    fontFamily: "Inter-Regular",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopWidth: 2,
    borderColor: "#1E3A8A",
    backgroundColor: "#F9FAFB",
  },
  totalLabel: {
    fontWeight: "700",
    fontSize: 18,
    marginRight: 24,
    color: "#1E3A8A",
    fontFamily: "Inter-Bold",
  },
  totalAmount: {
    fontWeight: "700",
    fontSize: 18,
    color: "#16A34A",
    fontFamily: "Inter-Bold",
  },
});
