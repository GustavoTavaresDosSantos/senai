import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import TaskCard from "../components/TaskCard";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: number | null;
}

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Comprar pão", completed: false, userId: null },
    { id: "2", title: "Estudar React Native", completed: true, userId: 1 },
  ]);

  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const addTask = ({
    title,
    description = "",
  }: {
    title: string;
    description?: string;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      userId: null,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskPress = (task: Task) => {
    navigation.navigate("Details", { item: task });
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = () => {
    setTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
    setModalVisible(false);
    setTaskToDelete(null);
  };

  const renderItem = ({ item }: { item: Task }) => {
    const isLocal = typeof item.id === "string";

    return (
      <View>
        <Text style={styles.sourceText}>{isLocal ? "Local" : "API"}</Text>
        <TaskCard
          title={item.title}
          completed={item.completed}
          onPress={() => (isLocal ? handleTaskPress(item) : null)}
          onToggle={() => (isLocal ? toggleTask(item.id) : null)}
          onDelete={() => {
            if (isLocal) {
              setTaskToDelete(item.id);
              setModalVisible(true);
            }
          }}
          isLocal={isLocal}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmar Exclusão"
        message="Deseja realmente excluir esta tarefa?"
        onConfirm={deleteTask}
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

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddTask", { addTask })}
        >
          <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmar Exclusão"
        message="Deseja realmente excluir esta tarefa?"
        onConfirm={deleteTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
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
  addButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sourceText: {
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 12,
    color: "#999",
  },
});
