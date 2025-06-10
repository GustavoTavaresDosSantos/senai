import { Text, StyleSheet, View, ViewStyle } from "react-native";

export default function Header(props: { style?: ViewStyle }) {
  return (
    <View style={props.style}>
      <Text style={styles.title}>Meu App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e6f3ff",
  },
});
