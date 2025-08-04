import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BotonPrimario({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity style={[styles.boton, style]} onPress={onPress}>
      <Text style={[styles.texto, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
