import { View, Text, StyleSheet } from "react-native";

export default function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Minha Primeira Tela Interativa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#1169f7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
