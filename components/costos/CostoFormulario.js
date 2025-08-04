import { agregarCosto } from '@/api/costosApi';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import BotonPrimario from '../comunes/BotonPrimario';
import InputTexto from '../comunes/InputTexto';

export default function CostoFormulario({ modo = 'crear' }) {
  const [tipo, setTipo] = useState('');
  const [monto, setMonto] = useState('');
  const router = useRouter();
  const { id } = useLocalSearchParams(); //  ID del viaje desde la URL

  const handleGuardar = async () => {
    const montoNumerico = parseFloat(monto);

    if (!tipo || monto === '' || isNaN(montoNumerico)) {
      Alert.alert('Campos inválidos', 'Ingresá un tipo válido y un monto numérico.');
      return;
    }

    const nuevoCosto = {
      tipo,
      monto: montoNumerico,
      viaje_id: parseInt(id), // asociar  costo al viaje correcto
    };

    console.log('Intentando guardar costo:', nuevoCosto);

    const { error } = await agregarCosto(nuevoCosto);

    if (error) {
      console.error('Error al guardar el costo:', error);
      Alert.alert('Error', 'No se pudo guardar el costo.');
    } else {
      router.replace('/(tabs)/costos');
    }
  };

  return (
    <View>
      <InputTexto
        label="Tipo de costo"
        value={tipo}
        onChangeText={setTipo}
        placeholder="Ej. Peaje, Comida, Hospedaje"
      />
      <InputTexto
        label="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        placeholder="Ej. 15000"
      />
      <BotonPrimario title="Guardar" onPress={handleGuardar} />
    </View>
  );
}
