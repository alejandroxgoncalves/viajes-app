import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { agregarDestino } from '@/api/destinosApi';
import BotonPrimario from '../comunes/BotonPrimario';
import InputTexto from '../comunes/InputTexto';

export default function DestinoFormulario({ modo = 'crear' }) {
  const [nombre, setNombre] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const router = useRouter();

  const handleGuardar = async () => {
    if (!nombre || !latitud || !longitud) {
      Alert.alert('Campos incompletos', 'Por favor completá todos los campos.');
      return;
    }
    
    const nuevoDestino = {
      nombre,
      latitud: parseFloat(latitud),
      longitud: parseFloat(longitud),
    };

    const { error } = await agregarDestino(nuevoDestino);

    if (error) {
      Alert.alert('Error', 'No se pudo guardar el destino.');
    } else {
      router.replace('/(tabs)/destinos');
    }
  };

  return (
    <View>
      <InputTexto
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej. Mendoza"
      />
      <InputTexto
        label="Latitud"
        value={latitud}
        onChangeText={setLatitud}
        placeholder="Ej. -32.8895"
        keyboardType="numeric"
      />
      <InputTexto
        label="Longitud"
        value={longitud}
        onChangeText={setLongitud}
        placeholder="Ej. -68.8458"
        keyboardType="numeric"
      />
      <BotonPrimario title="Guardar Destino" onPress={handleGuardar} />
    </View>
  );
}
