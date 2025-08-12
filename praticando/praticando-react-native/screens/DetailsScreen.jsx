import { StyleSheet, View, Text } from "react-native";
import { useTasks } from "../contexts/TaskContext"; // corrigido o caminho

export default function DetailsScreen({ route }) {
  const { task } = route.params;
  const { theme } = useTasks();

  const isDark = theme === "dark";

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <Text style={[styles.title, isDark && styles.darkText]}>
        {task.title}
      </Text>
      <Text style={[styles.detail, isDark && styles.darkDetail]}>
        Descrição: {task.description || "Nenhuma descrição"}
      </Text>
      <Text style={[styles.detail, isDark && styles.darkDetail]}>
        Prioridade: {task.priority || "Não definida"}
      </Text>
      <Text style={[styles.detail, isDark && styles.darkDetail]}>
        Status: {task.completed ? "Concluída" : "Pendente"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  darkText: {
    color: "#fff",
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  darkDetail: {
    color: "#fff",
  },
});
