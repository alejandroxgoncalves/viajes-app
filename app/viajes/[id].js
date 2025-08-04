import { supabase } from '@/lib/supabase';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CostoItem from '../../components/costos/CostoItem';
import DestinoCard from '../../components/destinos/DestinoCard';
import IntegranteCard from '../../components/integrantes/IntegranteCard';

export default function DetalleViajeScreen() {
  const { id } = useLocalSearchParams();
  const viajeId = parseInt(id);

  const [viaje, setViaje] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchViaje = async () => {
      const { data, error } = await supabase
        .from('viajes')
        .select('*')
        .eq('id', viajeId)
        .single();

      if (!error) setViaje(data);
      setCargando(false);
    };

    fetchViaje();
  }, [viajeId]);

  const eliminarElemento = (campo, index) => {
    const confirmar = window.confirm(`¿Eliminar este ${campo.slice(0, -1)}?`);
    if (!confirmar) return;

    const nuevoArray = [...viaje[campo]];
    nuevoArray.splice(index, 1);

    supabase
      .from('viajes')
      .update({ [campo]: nuevoArray })
      .eq('id', viajeId)
      .then(({ error }) => {
        if (error) {
          alert(`Error al eliminar ${campo.slice(0, -1)}`);
        } else {
          setViaje({ ...viaje, [campo]: nuevoArray });
        }
      });
  };

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!viaje) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Viaje no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{viaje.nombre}</Text>
      <Text style={styles.info}>Inicio: {viaje.fecha_inicio}</Text>
      <Text style={styles.info}>Fin: {viaje.fecha_fin}</Text>

      <Text style={styles.seccion}>📍 Destinos:</Text>
      <FlatList
        data={viaje.destinos || []}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <DestinoCard
            nombre={item.nombre || `Destino #${item}`}
            latitud={item.latitud}
            longitud={item.longitud}
            onEliminar={() => eliminarElemento('destinos', index)}
          />
        )}
        ListEmptyComponent={<Text style={styles.itemVacio}>Sin destinos</Text>}
      />

      <Text style={styles.seccion}>👤 Integrantes:</Text>
      <FlatList
        data={viaje.integrantes || []}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <IntegranteCard
            nombre={item.nombre || `Integrante #${item}`}
            telefono={item.telefono}
            onEliminar={() => eliminarElemento('integrantes', index)}
          />
        )}
        ListEmptyComponent={<Text style={styles.itemVacio}>Sin integrantes</Text>}
      />

      <Text style={styles.seccion}>💰 Costos:</Text>
      <FlatList
        data={viaje.costos || []}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <CostoItem
            tipo={item.tipo}
            monto={item.monto}
            onEliminar={() => eliminarElemento('costos', index)}
          />
        )}
        ListEmptyComponent={<Text style={styles.itemVacio}>Sin costos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 4 },
  seccion: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 4 },
  item: { fontSize: 15, paddingLeft: 8 },
  itemVacio: { fontSize: 14, color: '#777', paddingLeft: 8 },
  error: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 40 },
});
