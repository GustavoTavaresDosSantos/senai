import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import {
  loadTasks,
  deleteTask,
  clearTasks,
  toggleTaskCompletion,
} from "../features/tasks/tasksSlice";

export default function HomeScreen({ navigation }) {
  const { localTasks, theme } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [apiTasks, setApiTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchApiTasks();
    dispatch(loadTasks());
  }, [dispatch]);

  const fetchApiTasks = () => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => {
        const tasksWithPriority = response.data.map((task) => ({
          ...task,
          priority: ["alta", "media", "baixa"][Math.floor(Math.random() * 3)],
        }));
        setApiTasks(tasksWithPriority);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar tarefas da API");
        setIsLoading(false);
      });
  };

  const allTasks = [...apiTasks, ...localTasks];
  const filteredTasks = allTasks.filter((task) => {
    if (filter === "pending" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    if (priorityFilter !== "all" && task.priority !== priorityFilter)
      return false;
    return true;
  });

  const getCompletedCount = () =>
    allTasks.filter((task) => task.completed).length;

  const renderItem = ({ item }) => {
    const isLocal = typeof item.id === "string";
    return (
      <TaskCard
        title={item.title}
        completed={item.completed}
        priority={item.priority}
        onPress={
          isLocal ? () => navigation.navigate("Details", { task: item }) : null
        }
        onToggle={
          isLocal ? () => dispatch(toggleTaskCompletion(item.id)) : null
        }
        isLocal={isLocal}
        onDelete={
          isLocal
            ? () => {
                setTaskToDelete(item.id);
                setModalVisible(true);
              }
            : null
        }
      />
    );
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <Text style={[styles.title, theme === "dark" && styles.darkText]}>
        Minhas Tarefas
      </Text>
      <Text style={[styles.counterText, theme === "dark" && styles.darkText]}>
        Tarefas: {filteredTasks.length} | Concluídas: {getCompletedCount()}
      </Text>

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <View style={styles.filterContainer}>
        {["all", "pending", "completed"].map((f) => (
          <CustomButton
            key={f}
            title={
              f === "all"
                ? "Todas"
                : f === "pending"
                ? "Pendentes"
                : "Concluídas"
            }
            onPress={() => setFilter(f)}
            color={filter === f ? "#007bff" : "#ddd"}
            textStyle={{ color: filter === f ? "#fff" : "#333" }}
            size="small"
          />
        ))}
      </View>

      <View style={styles.filterContainer}>
        {["all", "alta", "media", "baixa"].map((p) => (
          <CustomButton
            key={p}
            title={
              p === "all" ? "Todas" : p.charAt(0).toUpperCase() + p.slice(1)
            }
            onPress={() => setPriorityFilter(p)}
            color={priorityFilter === p ? "#007bff" : "#ddd"}
            textStyle={{ color: priorityFilter === p ? "#fff" : "#333" }}
            size="small"
          />
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <>
          <Text style={[styles.errorText, theme === "dark" && styles.darkText]}>
            {error}
          </Text>
          <CustomButton
            title="Tentar Novamente"
            onPress={() => {
              setError(null);
              fetchApiTasks();
            }}
            color="#ffc107"
          />
        </>
      ) : filteredTasks.length === 0 ? (
        <Text style={[styles.emptyText, theme === "dark" && styles.darkText]}>
          Nenhuma tarefa encontrada
        </Text>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      <CustomButton
        title="Adicionar Tarefa"
        onPress={() => navigation.navigate("AddTask")}
        color="#28a745"
      />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmar Exclusão"
        message="Deseja realmente excluir esta tarefa?"
        onConfirm={() => {
          if (taskToDelete) dispatch(deleteTask(taskToDelete));
          setModalVisible(false);
          setTaskToDelete(null);
          setSuccessMessage("Tarefa excluída com sucesso!");
        }}
      />

      <CustomModal
        visible={clearModalVisible}
        onClose={() => setClearModalVisible(false)}
        title="Limpar Tarefas"
        message="Deseja excluir todas as tarefas locais?"
        onConfirm={() => {
          dispatch(clearTasks());
          setClearModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingBottom: 60,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  successText: {
    fontSize: 16,
    color: "#28a745",
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  counterText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
    marginTop: 20,
  },
  darkText: {
    color: "#fff",
  },
  list: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
});
