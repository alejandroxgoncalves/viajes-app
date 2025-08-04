import { StyleSheet, Text, View } from 'react-native';
import IntegranteFormulario from '../../components/integrantes/IntegranteFormulario';

export default function NuevoIntegranteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Integrante</Text>
      <IntegranteFormulario modo="crear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
});
