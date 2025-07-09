import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface TaskCardProps {
  title: string;
  completed: boolean;
  onPress?: () => void;
  onToggle?: () => void;
  userId?: number | null;
}

export default function TaskCard({
  title,
  completed,
  onPress,
  onToggle,
  userId,
}: TaskCardProps) {
  return (
    <View
      style={[styles.cardContainer, completed && styles.completedContainer]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        disabled={!onPress}
      >
        <Text style={[styles.cardTitle, completed && styles.completed]}>
          {title}
        </Text>
      </TouchableOpacity>

      {onToggle && (
        <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
          <Text style={styles.toggleText}>{completed ? "✔" : "○"}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.sourceText}>{!userId ? "Local" : "API"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  completedContainer: {
    backgroundColor: "#e6f3ff",
  },
  card: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  toggleButton: {
    padding: 10,
  },
  toggleText: {
    fontSize: 20,
    color: "#007bff",
  },
  sourceText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});
