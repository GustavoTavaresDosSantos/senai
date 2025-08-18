import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import tasksReducer from "./features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
  },
});
