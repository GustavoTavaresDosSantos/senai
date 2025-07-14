import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: "small" | "medium" | "large";
}

const sizeStyles = {
  small: { paddingVertical: 8, paddingHorizontal: 15 },
  medium: { paddingVertical: 12, paddingHorizontal: 20 },
  large: { paddingVertical: 16, paddingHorizontal: 30 },
};
const textSize = {
  small: { fontSize: 14 },
  medium: { fontSize: 16 },
  large: { fontSize: 18 },
};

export default function CustomButton({
  title,
  onPress,
  color = "#007bff",
  style,
  textStyle,
  size = "medium",
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color },
        sizeStyles[size],
        style,
      ]}
    >
      <Text style={[styles.buttonText, textSize[size], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
