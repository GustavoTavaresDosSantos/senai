import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

import Header from "./components/Header";

import CustomCard from "./components/CustomCard";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}

      <Header style={styles.header} />

      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Minha Tela Estilizada</Text>
      </View> */}

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <Image
          source={{ uri: "https://reactnative.dev/img/logo-og.png" }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>Explorando Estilos no React Native</Text>
      </View>

      {/* Seção de Cards */}
      <View style={styles.cardSection}>
        <CustomCard
          titulo="Card 1: Estilização"
          corFundo="#ffebcd"
          onPress={() => Alert.alert("Custom Card", "Card 1 Clicado!")}
        />
        <CustomCard
          titulo="Card 1: Estilização"
          corFundo="#ffebcd"
          onPress={() => Alert.alert("Custom Card", "Card 1 Clicado!")}
        />
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert("Ação", "Botão de ação clicado!")}
        >
          <Text style={styles.buttonText}>Ação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: "green", borderRadius: 50 },
          ]}
          onPress={() => Alert.alert("Ação", "Botão de ação clicado!")}
        >
          <Text style={styles.buttonText}>Ação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007bff",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  actionButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e6f3ff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  cardSection: {
    padding: 20,
  },
});
