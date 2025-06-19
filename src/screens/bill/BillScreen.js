import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db } from "../../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

export default function BillScreen() {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setBills([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "bills"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBills(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => {
    const readableDate = item.date?.seconds
      ? new Date(item.date.seconds * 1000).toLocaleDateString()
      : item.date;

    return (
      <TouchableOpacity
        style={styles.billContainer}
        onPress={() =>
          navigation.navigate("BillDetail", { bill: { ...item, readableDate } })
        }
      >
        <View style={styles.billHeader}>
          <View>
            <Text style={styles.billDate}>{readableDate}</Text>
            <Text style={styles.billTotal}>
              {item.totalAmount.toLocaleString()}₮
            </Text>
          </View>
        </View>

        {item.items?.slice(0, 2).map((p, i) => (
          <View key={i} style={styles.itemRow}>
            <Text style={styles.itemText}>{p.name}</Text>
            <Text style={styles.itemText}>{p.quantity}ш</Text>
            <Text style={styles.itemTime}>{p.time}</Text>
          </View>
        ))}
        {item.items?.length > 2 && (
          <Text style={styles.moreText}>
            ...бусад {item.items.length - 2} бараа
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="purple" />
        <Text>Уншиж байна...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bills}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  listContainer: {
    padding: 16,
  },
  billContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  billHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  billDate: {
    fontSize: 18, // Slightly larger for emphasis
    fontWeight: "600",
    color: "#1E3A8A", // Softer blue for better contrast
    fontFamily: "Inter-SemiBold", // Example custom font (ensure it's imported)
  },
  billTotal: {
    fontSize: 18,
    fontWeight: "600",
    color: "#16A34A", // Green to highlight total (distinguish from date)
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6, // More vertical padding
    paddingHorizontal: 12, // More horizontal padding
  },
  itemText: {
    fontSize: 16,
    color: "#1F2937", // Darker gray for better readability
    fontFamily: "Inter-Regular", // Consistent font
  },
  itemTime: {
    fontSize: 14, // Larger for readability
    color: "#6B7280", // Lighter gray for secondary info
    fontFamily: "Inter-Regular",
  },
  moreText: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#4B5563", // Slightly darker for visibility
    paddingLeft: 12,
    textDecorationLine: "underline", // Underline for "more" link
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC", // Match container background
  },
});
