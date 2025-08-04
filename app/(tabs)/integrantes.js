import { eliminarIntegrante, obtenerIntegrantes } from '@/api/integrantesApi';
import { useNavigationHelpers } from '@/app/navigation/useNavigationHelpers';
import { supabase } from '@/lib/supabase';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';

export default function IntegrantesScreen() {
  const [integrantes, setIntegrantes] = useState([]);
  const { goToNuevoIntegrante } = useNavigationHelpers?.() || {};

  useFocusEffect(
    useCallback(() => {
      cargarIntegrantes();
    }, [])
  );

  async function cargarIntegrantes() {
    const { data, error } = await obtenerIntegrantes();
    if (!error) setIntegrantes(data);
    else console.log('Error al traer integrantes:', error);
  }

  const handleEliminar = async (id) => {
    const eliminar = async () => {
      const { error: viajeError } = await supabase
        .rpc('eliminar_integrante_de_viajes', { integrante_id: id });

      if (viajeError) {
        alert('Error al limpiar referencias en viajes');
        console.log('viajeError:', viajeError);
        return;
      }

      const { error } = await eliminarIntegrante(id);
      if (!error) cargarIntegrantes();
      else {
        alert('Error al eliminar el integrante.');
        console.log('delete error:', error);
      }
    };

    if (Platform.OS === 'web') {
      const confirmado = window.confirm('¿Estás seguro de que querés eliminar este integrante?');
      if (confirmado) await eliminar();
    } else {
      Alert.alert(
        'Eliminar integrante',
        '¿Estás seguro de que querés eliminar este integrante?',
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
      <Text style={styles.titulo}>Integrantes Registrados</Text>

      <FlatList
        data={integrantes}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.telefono}>{item.telefono}</Text>
            <Button title="Eliminar" color="red" onPress={() => handleEliminar(item.id)} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay integrantes cargados aún.</Text>
        }
      />

      <Button title="Agregar Integrante" onPress={goToNuevoIntegrante} />
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
  telefono: { fontSize: 14, color: '#555' },
});
