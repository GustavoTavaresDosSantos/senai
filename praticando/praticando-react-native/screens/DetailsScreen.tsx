import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTasks } from "../contexts/TaskContext";

export default function DetailsScreen({ route, navigation }: any) {
  const { item } = route.params;
  const { theme } = useTasks();

  const handleEdit = () => {
    if (item.isLocal) {
      navigation.navigate("AddTask", { task: item });
    }
  };

  return (
    <View style={[
      styles.container, 
      theme === "dark" && styles.darkContainer
    ]}>
      <Text style={[
        styles.title, 
        theme === "dark" && styles.darkText
      ]}>
        {item.title}
      </Text>
      
      {item.description && (
        <Text style={[
          styles.description, 
          theme === "dark" && styles.darkText
        ]}>
          {item.description}
        </Text>
      )}
      
      <Text style={[
        styles.status, 
        theme === "dark" && styles.darkText
      ]}>
        Status: {item.completed ? "Concluída" : "Pendente"}
      </Text>
      
      <Text style={[
        styles.type, 
        theme === "dark" && styles.darkText
      ]}>
        Tipo: {item.isLocal ? "Local" : "API"}
      </Text>

      {item.isLocal && (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Editar Tarefa</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    lineHeight: 24,
  },
  status: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  type: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  darkText: {
    color: "#fff",
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

