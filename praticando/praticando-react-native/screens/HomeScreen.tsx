import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTasks } from "../contexts/TaskContext";
import TaskCard from "../components/TaskCard";
import CustomModal from "../components/CustomModal";

export default function HomeScreen({ navigation }: any) {
  const {
    localTasks,
    deleteTask,
    toggleTaskCompletion,
    getCompletedCount,
    clearTasks,
    theme,
    toggleTheme,
  } = useTasks();

  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [clearModalVisible, setClearModalVisible] = useState(false);

  const filteredTasks = localTasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const renderItem = ({ item }: any) => (
    <TaskCard
      title={item.title}
      completed={item.completed}
      onPress={() => navigation.navigate("Details", { item })}
      onToggle={() => toggleTaskCompletion(item.id)}
      onDelete={() => {
        setTaskToDelete(item.id);
        setModalVisible(true);
      }}
      isLocal
    />
  );

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <Text style={styles.countText}>
        Tarefas: {filteredTasks.length} | Concluídas: {getCompletedCount()}
      </Text>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <View style={styles.filterContainer}>
        {["all", "pending", "completed"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.activeFilter,
            ]}
            onPress={() => setFilter(type as typeof filter)}
          >
            <Text style={styles.filterText}>
              {type === "all"
                ? "Todas"
                : type === "pending"
                ? "Pendentes"
                : "Concluídas"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.buttonText}>+ Nova Tarefa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#dc3545", marginTop: 10 }]}
        onPress={() => setClearModalVisible(true)}
      >
        <Text style={styles.buttonText}>Limpar Tarefas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#6c757d", marginTop: 10 }]}
        onPress={toggleTheme}
      >
        <Text style={styles.buttonText}>
          Mudar para tema {theme === "light" ? "escuro" : "claro"}
        </Text>
      </TouchableOpacity>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmar Exclusão"
        message="Deseja realmente excluir esta tarefa?"
        onConfirm={() => {
          if (taskToDelete) deleteTask(taskToDelete);
          setModalVisible(false);
        }}
      />

      <CustomModal
        visible={clearModalVisible}
        onClose={() => setClearModalVisible(false)}
        title="Limpar Tarefas"
        message="Deseja apagar todas as tarefas locais?"
        onConfirm={() => {
          clearTasks();
          setClearModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  activeFilter: {
    backgroundColor: "#007bff",
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
  },
});
