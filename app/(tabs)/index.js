import { obtenerViajes } from '@/api/viajesApi';
import { useNavigationHelpers } from '@/app/navigation/useNavigationHelpers';
import ViajeCard from '@/components/viajes/ViajeCard';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function InicioScreen() {
  const { goToDetalleViaje, goToNuevoViaje } = useNavigationHelpers();
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    cargarViajes();
  }, []);

  async function cargarViajes() {
    const { data, error } = await obtenerViajes();
    if (!error) setViajes(data);
    else console.log('Error al traer viajes:', error);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Viajes</Text>

      <FlatList
            data={viajes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ViajeCard
                viaje={item}
                onPress={() => goToDetalleViaje(item.id)}
                onEliminar={cargarViajes} 
              />
            )}
            ListEmptyComponent={<Text style={styles.vacio}>No hay viajes aún.</Text>}
      />

      <Button title="Agregar Viaje" onPress={goToNuevoViaje} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  vacio: { textAlign: 'center', marginTop: 20, color: '#999' },
});
