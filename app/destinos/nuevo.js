import DestinoFormulario from '@/components/destinos/DestinoFormulario';
import { StyleSheet, Text, View } from 'react-native';

export default function NuevoDestinoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Destino</Text>
      <DestinoFormulario modo="crear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
});
