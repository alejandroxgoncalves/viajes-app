import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, CheckBox, ScrollView, StyleSheet, Text, View } from 'react-native';

import { obtenerCostos } from '@/api/costosApi';
import { obtenerDestinos } from '@/api/destinosApi';
import { obtenerIntegrantes } from '@/api/integrantesApi';
import { agregarViaje } from '@/api/viajesApi';

import BotonPrimario from '../comunes/BotonPrimario';
import DatePickerInput from '../comunes/DatePickerInput';
import InputTexto from '../comunes/InputTexto';

export default function ViajeFormulario({ modo = 'crear' }) {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const [integrantes, setIntegrantes] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [costos, setCostos] = useState([]);

  const [selectedIntegrantes, setSelectedIntegrantes] = useState([]);
  const [selectedDestinos, setSelectedDestinos] = useState([]);
  const [selectedCostos, setSelectedCostos] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: i } = await obtenerIntegrantes();
      const { data: d } = await obtenerDestinos();
      const { data: c } = await obtenerCostos();

      if (i) setIntegrantes(i);
      if (d) setDestinos(d);
      if (c) setCostos(c);
    };

    fetchData();
  }, []);

  const toggleSelect = (list, setList, item) => {
    const exists = list.find((el) => el.id === item.id);
    if (exists) {
      setList(list.filter((el) => el.id !== item.id));
    } else {
      setList([...list, item]);
    }
  };

  const handleGuardar = async () => {
    if (!nombre || !fechaInicio || !fechaFin) {
      Alert.alert('Campos incompletos', 'Completá nombre y fechas.');
      return;
    }

    const nuevoViaje = {
      nombre,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      integrantes: selectedIntegrantes,
      destinos: selectedDestinos,
      costos: selectedCostos,
    };

    const { error } = await agregarViaje(nuevoViaje);

        if (error) {
          console.log('Error al guardar el viaje:', error);
          Alert.alert('Error', 'No se pudo guardar el viaje.');
        } else {
          Alert.alert('Éxito', 'Viaje guardado correctamente.');
          router.replace('/(tabs)/');
        }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <InputTexto
        label="Nombre del viaje"
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej. Vacaciones al sur"
      />

      <DatePickerInput
        fecha={fechaInicio}
        setFecha={setFechaInicio}
        label="Fecha de inicio"
      />

      <DatePickerInput
        fecha={fechaFin}
        setFecha={setFechaFin}
        label="Fecha de fin"
      />

      <Text style={styles.seccion}>📍 Seleccionar Destinos</Text>
      {destinos.map((destino) => (
        <View key={destino.id} style={styles.checkItem}>
          <CheckBox
            value={selectedDestinos.some((d) => d.id === destino.id)}
            onValueChange={() =>
              toggleSelect(selectedDestinos, setSelectedDestinos, destino)
            }
          />
          <Text>{destino.nombre}</Text>
        </View>
      ))}

      <Text style={styles.seccion}>👥 Seleccionar Integrantes</Text>
      {integrantes.map((int) => (
        <View key={int.id} style={styles.checkItem}>
          <CheckBox
            value={selectedIntegrantes.some((i) => i.id === int.id)}
            onValueChange={() =>
              toggleSelect(selectedIntegrantes, setSelectedIntegrantes, int)
            }
          />
          <Text>{int.nombre}</Text>
        </View>
      ))}

      <Text style={styles.seccion}>💰 Seleccionar Costos</Text>
      {costos.map((costo) => (
        <View key={costo.id} style={styles.checkItem}>
          <CheckBox
            value={selectedCostos.some((c) => c.id === costo.id)}
            onValueChange={() =>
              toggleSelect(selectedCostos, setSelectedCostos, costo)
            }
          />
          <Text>{costo.tipo} - ${costo.monto}</Text>
        </View>
      ))}

      <BotonPrimario title="Guardar Viaje" onPress={handleGuardar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  seccion: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 6,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
