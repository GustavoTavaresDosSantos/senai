import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface CardTaskProps {
  title: string;
  description: string;
  isSelected: boolean;
  done: boolean;
  onSelect: () => void;
  onPress: () => void;
}

export default function CardTask({
  title,
  description,
  isSelected,
  done,
  onSelect,
  onPress,
}: CardTaskProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelect}>
        <Feather
          name={isSelected ? "check-square" : "square"}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPress} style={styles.textContainer}>
        <Text style={[styles.title, done && styles.done]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  icon: {
    fontSize: 24,
    color: "white",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
  },
  done: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
