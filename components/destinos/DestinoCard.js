import { Button, StyleSheet, Text, View } from 'react-native';

export default function DestinoCard({ nombre, latitud, longitud, onEliminar }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.coords}>
        Lat: {latitud} | Lon: {longitud}
      </Text>

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
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  coords: {
    fontSize: 14,
    color: '#555',
  },
  btnEliminar: {
    marginTop: 10,
  },
});
