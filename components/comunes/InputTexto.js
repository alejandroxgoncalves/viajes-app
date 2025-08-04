import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputTexto({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  style,
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[styles.input, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, color: '#555', marginBottom: 4 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
