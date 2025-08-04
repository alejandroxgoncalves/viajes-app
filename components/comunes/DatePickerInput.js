import dayjs from 'dayjs';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-ui-datepicker';

export default function DatePickerInput({ fecha, setFecha, label = 'Seleccionar fecha' }) {
  const [visible, setVisible] = useState(false);

  const handleConfirm = (date) => {
    setFecha(date.toISOString());
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
        <Text style={styles.texto}>
          {fecha ? dayjs(fecha).format('DD/MM/YYYY') : label}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.pickerContainer}>
            <DatePicker
                mode="single"
                date={fecha ? new Date(fecha) : new Date()}
                onChange={({ date }) => handleConfirm(date)}
              />
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.cancelar}>
              <Text style={styles.cancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
  },
  texto: { fontSize: 16, color: '#333' },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cancelar: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelarTexto: {
    color: '#007AFF',
    fontSize: 16,
  },
});
