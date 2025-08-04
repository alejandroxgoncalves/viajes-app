import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { agregarIntegrante } from '@/api/integrantesApi';
import BotonPrimario from '../comunes/BotonPrimario';
import InputTexto from '../comunes/InputTexto';

export default function IntegranteFormulario({ modo = 'crear' }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const router = useRouter();

  const handleGuardar = async () => {
    if (!nombre || !telefono) {
      Alert.alert('Campos incompletos', 'Por favor completá todos los campos.');
      return;
    }

    const nuevoIntegrante = {
      nombre,
      telefono,
    };

    const { error } = await agregarIntegrante(nuevoIntegrante);

    if (error) {
      Alert.alert('Error', 'No se pudo guardar el integrante.');
    } else {
      router.replace('/(tabs)/integrantes');
    }
  };

  return (
    <View>
      <InputTexto
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej. Ana López"
      />
      <InputTexto
        label="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Ej. 1122334455"
        keyboardType="phone-pad"
      />
      <BotonPrimario title="Guardar Integrante" onPress={handleGuardar} />
    </View>
  );
}
