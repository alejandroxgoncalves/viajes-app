import { eliminarCosto, obtenerCostos } from '@/api/costosApi';
import { useNavigationHelpers } from '@/app/navigation/useNavigationHelpers';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';

export default function CostosScreen() {
  const [costos, setCostos] = useState([]);
  const { goToNuevoCosto } = useNavigationHelpers?.() || {};

  useEffect(() => {
    cargarCostos();
  }, []);

  async function cargarCostos() {
    const { data, error } = await obtenerCostos();
    if (!error) setCostos(data);
    else console.log('Error al cargar costos:', error);
  }

  const handleEliminar = async (id) => {
    const eliminar = async () => {
      const { error: viajeError } = await supabase.rpc('eliminar_costo_de_viajes', {
        costo_id: id,
      });

      if (viajeError) {
        alert('Error al limpiar referencias en viajes');
        console.log('viajeError:', viajeError);
        return;
      }

      const { error } = await eliminarCosto(id);
      if (!error) cargarCostos();
      else {
        alert('Error al eliminar el costo.');
        console.log('delete error:', error);
      }
    };

    if (Platform.OS === 'web') {
      const confirmado = window.confirm('¿Estás seguro de que querés eliminar este costo?');
      if (confirmado) await eliminar();
    } else {
      Alert.alert(
        'Eliminar costo',
        '¿Estás seguro de que querés eliminar este costo?',
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
      <Text style={styles.titulo}>Costos Registrados</Text>

      <FlatList
        data={costos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.costoItem}>
            <Text style={styles.tipo}>{item.tipo}</Text>
            <Text style={styles.monto}>${item.monto}</Text>
            {item.viajeId && (
              <Text style={styles.viaje}>Viaje ID: {item.viajeId}</Text>
            )}
            <Button title="Eliminar" color="red" onPress={() => handleEliminar(item.id)} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay costos cargados aún.</Text>
        }
      />

      <Button title="Agregar Costo" onPress={goToNuevoCosto || (() => {})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  vacio: { textAlign: 'center', marginTop: 20, color: '#999' },
  costoItem: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  tipo: { fontSize: 16, fontWeight: '600' },
  monto: { fontSize: 16 },
  viaje: { fontSize: 12, color: '#666', marginTop: 4 },
});
