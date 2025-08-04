import { eliminarViaje } from '@/api/viajesApi';
import { Alert, Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function ViajeCard({ viaje, onPress, onEliminar }) {
  const handleEliminar = () => {
  if (Platform.OS === 'web') {
    const confirmar = window.confirm(`¿Eliminar el viaje "${viaje.nombre}"?`);
    if (confirmar) {
      eliminarViaje(viaje.id).then(({ error }) => {
        if (error) {
          console.error(error);
          alert('No se pudo eliminar');
        } else {
          onEliminar?.();
        }
      });
    }
  } else {
    Alert.alert(
      '¿Eliminar viaje?',
      `¿Estás seguro de eliminar el viaje "${viaje.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const { error } = await eliminarViaje(viaje.id);
            if (error) {
              Alert.alert('Error', 'No se pudo eliminar el viaje.');
            } else {
              onEliminar?.();
            }
          },
        },
      ]
    );
  }
};

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.nombre}>{viaje.nombre}</Text>
        <Text style={styles.fecha}>📅 Inicio: {viaje.fecha_inicio}</Text>
        <Text style={styles.fecha}>🏁 Fin: {viaje.fecha_fin}</Text>
      </TouchableOpacity>
      <View style={styles.botonEliminar}>
        <Button title="Eliminar" color="red" onPress={handleEliminar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  fecha: {
    fontSize: 14,
    color: '#555',
  },
  botonEliminar: {
    marginTop: 10,
  },
});
