import { View, Text, StyleSheet } from "react-native";

export default function ItemCard() {
  return (
    <View style={styles.card}>
      <Text>ItemCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    elevation: 2,
  },
});
