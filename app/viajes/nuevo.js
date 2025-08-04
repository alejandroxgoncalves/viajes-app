import ViajeFormulario from '@/components/viajes/ViajeFormulario';
import { StyleSheet, Text, View } from 'react-native';

export default function NuevoViajeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Viaje</Text>
      <ViajeFormulario modo="crear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
});
