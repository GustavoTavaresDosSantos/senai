import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ListRenderItem,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CardTask from "../components/CardTask";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Picker } from "@react-native-picker/picker";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface Tarefa {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export default function Home({ navigation }: Props) {
  const [filter, setFilter] = useState<"all" | "done" | "notDone">("all");
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {
      id: "1",
      title: "When I met you in the summer",
      description: "To my heart beat sound",
      done: false,
    },
    {
      id: "2",
      title: "Na faixa de gaza",
      description: "Só homem bomba, na guerra é tudo ou nada",
      done: false,
    },
  ]);

  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  function toggleSelect(id: string) {
    if (selecionadas.includes(id)) {
      setSelecionadas(selecionadas.filter((item) => item !== id));
    } else {
      setSelecionadas([...selecionadas, id]);
    }
  }

  function selecionarTudo() {
    if (selecionadas.length === tarefas.length) {
      setSelecionadas([]);
    } else {
      setSelecionadas(tarefas.map((item) => item.id));
    }
  }

  function apagarSelecionadas() {
    setTarefas(tarefas.filter((item) => !selecionadas.includes(item.id)));
    setSelecionadas([]);
  }

  function marcarComoConcluidas() {
    setTarefas(
      tarefas.map((item) =>
        selecionadas.includes(item.id) ? { ...item, done: true } : item
      )
    );
    setSelecionadas([]);
  }

  type NovaTarefa = { title: string; description: string };

  function adicionarTarefa(nova: NovaTarefa) {
    const novaTarefa: Tarefa = {
      id: Math.random().toString(),
      title: nova.title,
      description: nova.description,
      done: false,
    };
    setTarefas([...tarefas, novaTarefa]);
  }

  const renderItem: ListRenderItem<Tarefa> = ({ item }) => (
    <CardTask
      title={item.title}
      description={item.description}
      isSelected={selecionadas.includes(item.id)}
      done={item.done}
      onSelect={() => toggleSelect(item.id)}
      onPress={() =>
        navigation.navigate("Details", {
          title: item.title,
          description: item.description,
        })
      }
    />
  );

  const tarefasFiltradas = tarefas.filter((item) => {
    if (filter === "all") return true;
    if (filter === "done") return item.done === true;
    if (filter === "notDone") return item.done === false;
    return true;
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/background.jpg")}
        style={styles.background}
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.defaultHeader}>
          <Text style={styles.headerTitle}>Minhas Tarefas</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddTask", { onAddTask: adicionarTarefa })
            }
          >
            <Feather name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.selectionHeader}>
          <View style={styles.leftGroup}>
            <TouchableOpacity
              onPress={selecionarTudo}
              style={styles.iconButton}
            >
              <Feather name="square" style={styles.icon} />
            </TouchableOpacity>
            <Picker
              selectedValue={filter}
              style={styles.picker}
              dropdownIconColor="white"
              onValueChange={(itemValue) => setFilter(itemValue)}
              mode="dropdown"
            >
              <Picker.Item label="Todas" value="all" />
              <Picker.Item label="Não Lidas" value="notDone" />
              <Picker.Item label="Lidas" value="done" />
            </Picker>
          </View>

          <View style={styles.rightGroup}>
            <TouchableOpacity
              onPress={marcarComoConcluidas}
              style={styles.iconButton}
            >
              <Feather name="check" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={apagarSelecionadas}
              style={styles.iconButton}
            >
              <Feather name="trash" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  iconButton: {
    marginRight: 16,
  },
  picker: {
    width: 124,
    color: "white",
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
  },
  separator: {
    height: 12,
  },
  defaultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  selectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    fontSize: 24,
    color: "white",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});
