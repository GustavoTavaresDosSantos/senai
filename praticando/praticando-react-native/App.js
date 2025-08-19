import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import LocationScreen from "./screens/LocationScreen";
import HomeScreen from "./screens/HomeScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  const { theme } = useSelector((state) => state.tasks);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          title: "Adicionar Tarefa",
          headerStyle: {
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#28a745",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "Detalhes da Tarefa",
          headerStyle: {
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#dc3545",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const { theme } = useSelector((state) => state.tasks);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Tarefas") iconName = "home";
          if (route.name === "Perfil") iconName = "person";
          if (route.name === "Configurações") iconName = "settings";
          if (route.name === "Localização") iconName = "location-on";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
        },
        tabBarActiveTintColor: theme === "dark" ? "#007bff" : "#007bff",
        tabBarInactiveTintColor: theme === "dark" ? "#888" : "#666",
        headerStyle: {
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
        },
        headerTintColor: theme === "dark" ? "#fff" : "#000",
      })}
    >
      <Tab.Screen
        name="Tarefas"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Configurações" component={SettingsScreen} />
      <Tab.Screen name="Localização" component={LocationScreen} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const { theme } = useSelector((state) => state.tasks);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#007bff",
        drawerInactiveTintColor: theme === "dark" ? "#888" : "#666",
        drawerStyle: {
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
        },
        headerStyle: {
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
        },
        headerTintColor: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <Drawer.Screen
        name="Tarefas"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Configurações"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Localização"
        component={LocationScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="location-on" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AppContent() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
