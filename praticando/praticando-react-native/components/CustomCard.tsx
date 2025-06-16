import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CustomCard({
  titulo,
  corFundo,
  onPress,
}: {
  titulo: string;
  corFundo: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: corFundo }]}
    >
      <Text style={styles.cardText}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
});
