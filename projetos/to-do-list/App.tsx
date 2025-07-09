import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import AddTask from "./screens/AddTask";
import Details from "./screens/Details";

export type RootStackParamList = {
  Home: undefined;
  AddTask: {
    onAddTask: (nova: { title: string; description: string }) => void;
  };
  Details: {
    title: string;
    description: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddTask" component={AddTask} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
