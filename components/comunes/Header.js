import { StyleSheet, Text, View } from 'react-native';

export default function Header({ titulo, subtitulo = null }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
