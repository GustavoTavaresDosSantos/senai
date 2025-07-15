import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import { useTasks } from "../contexts/TaskContext";

export default function AddTaskScreen({ route, navigation }: any) {
  const { addTask, updateTask } = useTasks();
  const task = route.params?.task;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título é obrigatório.");
      return;
    }

    if (task) {
      updateTask(task.id, { title, description });
    } else {
      addTask({ title, description });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <CustomInput
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título"
        required
      />

      <Text style={styles.label}>Descrição</Text>
      <CustomInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição (opcional)"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{task ? "Salvar" : "Adicionar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
