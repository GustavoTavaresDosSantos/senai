import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

interface DetailsProps {
  route: {
    params: {
      title: string;
      description: string;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

export default function Details({ route, navigation }: DetailsProps) {
  const { title, description } = route.params;

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
          <Text style={styles.headerTitle}>Detalhes</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
});
