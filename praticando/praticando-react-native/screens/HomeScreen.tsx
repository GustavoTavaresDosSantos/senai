import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

const DATA = [
  { id: "1", title: "Item 1", description: "Descrição do item 1" },
  { id: "2", title: "Item 2", description: "Descrição do item 2" },
  { id: "3", title: "Item 3", description: "Descrição do item 3" },
  { id: "4", title: "Item 4", description: "Descrição do item 4" },
  { id: "5", title: "Item 5", description: "Descrição do item 5" },
];

export default function HomeScreen({ navigation }: any) {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const [count, setCount] = useState(0);
  const [mostrouAlerta, setMostrouAlerta] = useState(false);

  useEffect(() => {
    if (count === 10) {
      Alert.alert("Parabéns!", "Você atingiu 10 cliques!");
    } else if (count === 0) {
      Alert.alert("Resetado", "O contador foi zerado!");
    }

    if (count === 5 && !mostrouAlerta) {
      Alert.alert("Meta parcial!", "Você chegou a 5 cliques!");
      setMostrouAlerta(true);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Contador: {count}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setCount((prev) => prev + 1)}
        >
          <Text style={styles.buttonText}>Incrementar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: "#ffc107" }]}
          onPress={() => setCount((prev) => Math.max(0, prev - 1))}
        >
          <Text style={styles.buttonText}>Decrementar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: "#dc3545" }]}
          onPress={() => setCount(0)}
        >
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: "#28a745" }]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Ir para Perfil</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Lista de Itens</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#028745" }]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Ir para Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  counterContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  counterText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  counterButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
