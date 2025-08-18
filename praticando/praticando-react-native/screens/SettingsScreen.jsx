import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "../features/counterSlice";
import {
  toggleTheme,
  clearTasks,
  exportTasks,
  restoreTasks,
  saveTasks,
} from "../features/tasks/tasksSlice";

export default function SettingsScreen({ navigation }) {
  const { theme } = useSelector((state) => state.tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleClearTasks = async () => {
    try {
      await dispatch(clearTasks());
      await dispatch(saveTasks([]));
      setModalVisible(false);
      setSuccessMessage("Tarefas limpas com sucesso!");
    } catch {
      setModalVisible(false);
      setSuccessMessage("");
      alert("Erro ao limpar tarefas.");
    }
  };

  const handleExport = async () => {
    try {
      const result = await dispatch(exportTasks()).unwrap();
      setSuccessMessage(result);
    } catch (err) {
      setSuccessMessage("");
      alert(err.message);
    }
  };

  const handleRestore = async () => {
    try {
      const result = await dispatch(restoreTasks()).unwrap();
      setSuccessMessage("Backup restaurado com sucesso!");
    } catch (err) {
      setSuccessMessage("");
      alert(err.message);
    }
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
        Configurações
      </Text>

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <Text style={[styles.title, theme === "dark" && styles.darkText]}>
        Contador: {counter}
      </Text>

      <CustomButton
        title="Incrementar"
        onPress={() => dispatch(increment())}
        color="#007bff"
      />
      <CustomButton
        title="Incrementar por 5"
        onPress={() => dispatch(incrementByAmount(5))}
        color="#007bff"
      />
      <CustomButton
        title="Decrementar"
        onPress={() => dispatch(decrement())}
        color="#007bff"
      />
      <CustomButton
        title="Resetar Contador"
        onPress={() => dispatch(reset())}
        color="#007bff"
      />

      <CustomButton
        title={`Mudar para Tema ${theme === "light" ? "Escuro" : "Claro"}`}
        onPress={() => dispatch(toggleTheme())}
        color="#007bff"
      />

      <CustomButton
        title="Limpar Todas as Tarefas"
        onPress={() => setModalVisible(true)}
        color="#dc3545"
      />

      <CustomButton
        title="Exportar Tarefas"
        onPress={handleExport}
        color="#17a2b8"
      />

      <CustomButton
        title="Restaurar Backup"
        onPress={handleRestore}
        color="#17a2b8"
      />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Limpar Tarefas"
        message="Deseja excluir todas as tarefas locais?"
        onConfirm={handleClearTasks}
      />

      <CustomButton
        title="Abrir Menu"
        onPress={() => navigation.toggleDrawer()}
        color="#6c757d"
      />
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
    textAlign: "center",
  },
  successText: {
    fontSize: 16,
    textAlign: "center",
    color: "#28a745",
    marginBottom: 10,
  },
  darkText: {
    color: "#fff",
  },
});
