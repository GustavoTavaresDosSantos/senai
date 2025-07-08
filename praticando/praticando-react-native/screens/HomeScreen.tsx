import React, { useState } from "react";
import { View, FlatList } from "react-native";
import TaskCard from "../components/TaskCard";

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Comprar pão", completed: false },
    { id: "2", title: "Estudar React Native", completed: true },
  ]);

  const handleTaskPress = (task: any) => {
    navigation.navigate("Details", { task });
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            completed={item.completed}
            onPress={() => handleTaskPress(item)}
            onToggle={() => toggleTask(item.id)}
          />
        )}
      />
    </View>
  );
}
