import { createContext, useContext, useState, useMemo } from "react";

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
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

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
