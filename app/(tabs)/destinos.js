import { eliminarDestino, obtenerDestinos } from '@/api/destinosApi';
import { useNavigationHelpers } from '@/app/navigation/useNavigationHelpers';
import { supabase } from '@/lib/supabase';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';

export default function DestinosScreen() {
  const [destinos, setDestinos] = useState([]);
  const { goToNuevoDestino } = useNavigationHelpers();

  useFocusEffect(
    useCallback(() => {
      cargarDestinos();
    }, [])
  );

  async function cargarDestinos() {
    const { data, error } = await obtenerDestinos();
    if (!error) setDestinos(data);
    else console.log('Error al traer destinos:', error);
  }

  const handleEliminar = async (id) => {
    const eliminar = async () => {
      const { error: rpcError } = await supabase.rpc('eliminar_destino_de_viajes', {
        destino_id: id,
      });

      if (rpcError) {
        alert('Error al limpiar asociaciones en viajes');
        console.log('rpcError:', rpcError);
        return;
      }

      const { error } = await eliminarDestino(id);
      if (!error) cargarDestinos();
      else {
        alert('Error al eliminar el destino.');
        console.log('delete error:', error);
      }
    };

    if (Platform.OS === 'web') {
      const confirmado = window.confirm('¿Estás seguro de que querés eliminar este destino?');
      if (confirmado) await eliminar();
    } else {
      Alert.alert(
        'Eliminar destino',
        '¿Estás seguro de que querés eliminar este destino?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: eliminar,
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Destinos Registrados</Text>

      <FlatList
        data={destinos}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.coords}>
              Lat: {item.latitud} | Lon: {item.longitud}
            </Text>
            <Button title="Eliminar" color="red" onPress={() => handleEliminar(item.id)} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay destinos cargados aún.</Text>
        }
      />

      <Button title="Agregar Destino" onPress={goToNuevoDestino} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  vacio: { textAlign: 'center', marginTop: 20, color: '#999' },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nombre: { fontSize: 16, fontWeight: '600' },
  coords: { fontSize: 14, color: '#555' },
});
