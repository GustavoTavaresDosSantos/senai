import { createContext, useContext, useState, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: number | null;
}

interface TaskContextProps {
  localTasks: Task[];
  addTask: (task: { title: string; description?: string }) => void;
  updateTask: (
    id: string,
    task: { title: string; description?: string }
  ) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  clearTasks: () => void;
  getCompletedCount: () => number;
  theme: "light" | "dark";
  toggleTheme: () => void;
  exportTasks: () => Promise<string | null>;
  importTasks: (tasksJson: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@TaskApp:tasks');
        if (storedTasks) {
          setLocalTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas do AsyncStorage:", error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('@TaskApp:tasks', JSON.stringify(localTasks));
      } catch (error) {
        console.error("Erro ao salvar tarefas no AsyncStorage:", error);
      }
    };
    saveTasks();
  }, [localTasks]);

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
    setLocalTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (
    id: string,
    { title, description = "" }: { title: string; description?: string }
  ) => {
    setLocalTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setLocalTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setLocalTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearTasks = () => {
    setLocalTasks([]);
  };

  const getCompletedCount = () => {
    return localTasks.filter((task) => task.completed).length;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({
      localTasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion,
      clearTasks,
      getCompletedCount,
      theme,
      toggleTheme,
      exportTasks,
      importTasks,
    }),
    [localTasks, theme]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks deve ser usado dentro de TaskProvider");
  }
  return context;
};


  const exportTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('@TaskApp:tasks');
      return tasksJson;
    } catch (error) {
      console.error("Erro ao exportar tarefas:", error);
      return null;
    }
  };

  const importTasks = async (tasksJson: string) => {
    try {
      const tasks = JSON.parse(tasksJson);
      setLocalTasks(tasks);
      await AsyncStorage.setItem('@TaskApp:tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao importar tarefas:", error);
    }
  };

