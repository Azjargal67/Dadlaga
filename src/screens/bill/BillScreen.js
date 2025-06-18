import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const BillScreen = ({ route }) => {
  const { bills } = route.params || {};

  const renderBillItem = ({ item }) => (
    <SafeAreaView>
      <View style={styles.billItem}>
        <Text style={styles.dateTime}>{`${item.date} ${item.time}`}</Text>
        <Text style={styles.barcode}>Баркод: {item.barcode}</Text>
        <Text style={styles.amount}>{item.amount}₮</Text>
      </View>
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.header}>Баримт</Text>
        {bills && bills.length > 0 ? (
          <FlatList
            data={bills}
            renderItem={renderBillItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text style={styles.noBills}>Баримт байхгүй байна</Text>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  billItem: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  dateTime: {
    fontSize: 14,
    color: colors.darkText,
    marginBottom: 4,
  },
  barcode: {
    fontSize: 12,
    color: colors.lightText,
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  list: {
    paddingBottom: 20,
  },
  noBills: {
    textAlign: "center",
    color: colors.lightText,
    fontSize: 16,
  },
});

export default BillScreen;
