import { Button, StyleSheet, Text, View } from 'react-native';

export default function CostoItem({ tipo, monto, onEliminar }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.tipo}>{tipo}</Text>
        <Text style={styles.monto}>${monto}</Text>
      </View>

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
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipo: { fontSize: 16, fontWeight: '600' },
  monto: { fontSize: 16, color: '#007AFF' },
  btnEliminar: {
    marginLeft: 12,
  },
});
