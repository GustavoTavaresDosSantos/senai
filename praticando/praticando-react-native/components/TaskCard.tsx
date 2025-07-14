import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

interface TaskCardProps {
  title: string;
  completed: boolean;
  onPress?: () => void;
  onToggle?: () => void;
  isLocal?: boolean;
  onDelete?: () => void;
}

export default function TaskCard({
  title,
  completed,
  onPress,
  onToggle,
  isLocal,
  onDelete,
}: TaskCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.actions}>
        {onToggle && (
          <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
            <Text style={styles.toggleText}>{completed ? "✔" : "○"}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {isLocal && onDelete && (
          <CustomButton
            title="Excluir"
            onPress={onDelete}
            color="#dc3545"
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  toggleButton: {
    marginRight: 10,
  },
  toggleText: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    fontSize: 14,
  },
});
