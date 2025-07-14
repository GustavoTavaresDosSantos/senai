import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface CustomInputProps extends TextInputProps {
  multiline?: boolean;
  required?: boolean;
}

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style,
  required = false,
  ...props
}: CustomInputProps) {
  const showError = required && !value;

  return (
    <TextInput
      style={[
        styles.input,
        multiline && styles.multiline,
        showError && styles.errorInput,
        style,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiline}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 10,
    fontSize: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "#dc3545",
  },
});
