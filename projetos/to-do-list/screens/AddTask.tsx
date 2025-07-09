import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type AddTaskRouteProp = RouteProp<RootStackParamList, "AddTask">;

type Props = {
  route: AddTaskRouteProp;
  navigation: any;
};

export default function AddTask({ route, navigation }: Props) {
  const { onAddTask } = route.params;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAddTask = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (trimmedTitle === "") {
      Alert.alert("Campo vazio", "Digite um título para a tarefa.");
      return;
    }

    onAddTask({ title: trimmedTitle, description: trimmedDescription });
    setTitle("");
    setDescription("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/background.jpg")}
        style={styles.background}
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Feather name="arrow-left" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adicionar Tarefa</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Título (máx. 30 caracteres)"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={title}
          onChangeText={(text) => (text.length <= 30 ? setTitle(text) : null)}
          selectionColor="#fff"
          keyboardAppearance="dark"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição (opcional, máx. 500 caracteres)"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={description}
          onChangeText={(text) =>
            text.length <= 500 ? setDescription(text) : null
          }
          multiline
          numberOfLines={4}
          selectionColor="#fff"
          keyboardAppearance="dark"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    fontSize: 24,
    color: "white",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    height: 48,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
