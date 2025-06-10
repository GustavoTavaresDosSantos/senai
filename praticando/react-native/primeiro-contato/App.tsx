import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import Saudacao from "./components/Saudacao";
import Card from "./components/Card";
import Header from "./components/Header";

export default function App() {
  const handleButtonPress = () => {
    Alert.alert("Botão Pressionado", "Você clicou no botão!");
  };

  const handleTouchablePress = () => {
    Alert.alert("Touchable Pressionado", "Você clicou no botão personalizado");
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Bem-vindo ao React Native!</Text>
      <Saudacao />
      <Card texto="Card 1: Bem-vindo!" />
      <Card texto="Card 2: React Native é incrível!" />
      <Image
        source={{ uri: "https://reactnative.dev/img/logo-og.png" }}
        style={styles.image}
      />
      <Image
        source={require("./assets/kermitCapuz.jpg")}
        style={styles.image}
      />
      <Button title="Clique Aqui" onPress={handleButtonPress} />
      <TouchableOpacity
        style={styles.customButton}
        onPress={handleTouchablePress}
      >
        <Text style={styles.buttonText}>Botão Personalizado</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.customButton, { backgroundColor: "#dc3545" }]}
        onPress={() => Alert.alert("Atenção", "Botão vermelho clicado!")}
      >
        <Text style={styles.buttonText}>Botão Vermelho</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.customButton,
          { backgroundColor: "#green", borderRadius: 15 },
        ]}
        onPress={() => Alert.alert("Atenção", "Botão verde clicado!")}
      >
        <Text style={styles.buttonText}>Botão Verde</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
