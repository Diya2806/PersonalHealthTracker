import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { saveActivity } from '../utils/storage';

export default function AddActivity() {
  const [type, setType] = useState('water');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');

  const save = async () => {
    if (!value) {
      Alert.alert('Error', 'Please enter value');
      return;
    }

    await saveActivity({
      type,
      value,
      notes,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
    });

    router.back(); // go back → dashboard refresh
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Activity Type</Text>

      <View style={styles.pickerBox}>
        <Picker selectedValue={type} onValueChange={setType}>
          <Picker.Item label="💧 Water Intake" value="water" />
          <Picker.Item label="🚶 Steps Walked" value="steps" />
          <Picker.Item label="😴 Sleep Hours" value="sleep" />
        </Picker>
      </View>

      <Text style={styles.label}>Value</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter value"
        onChangeText={setValue}
      />

      <Text style={styles.label}>Notes (Optional)</Text>
      <TextInput style={styles.input} onChangeText={setNotes} />

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.btnText}>Save Activity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  label: { marginTop: 10, marginBottom: 5, color: '#555' },

  pickerBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  },

  btnText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
