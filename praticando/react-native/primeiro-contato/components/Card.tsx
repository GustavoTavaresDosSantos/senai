import { View, Text, StyleSheet } from "react-native";

// type CardProps = {
//   texto: string;
// };

export default function Card(props: { texto: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{props.texto}</Text>
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
    color: "#fff",
  },
});
