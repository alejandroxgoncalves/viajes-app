import CostoFormulario from '@/components/costos/CostoFormulario';
import { StyleSheet, Text, View } from 'react-native';

export default function NuevoCostoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Costo</Text>
      <CostoFormulario modo="crear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
});
