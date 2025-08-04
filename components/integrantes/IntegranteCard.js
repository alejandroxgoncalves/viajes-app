import { Button, StyleSheet, Text, View } from 'react-native';

export default function IntegranteCard({ nombre, telefono, onEliminar }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.telefono}>📞 {telefono}</Text>

      {onEliminar && (
        <View style={styles.btnEliminar}>
          <Button title="Eliminar" color="red" onPress={onEliminar} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  telefono: {
    fontSize: 14,
    color: '#444',
  },
  btnEliminar: {
    marginTop: 8,
  },
});
