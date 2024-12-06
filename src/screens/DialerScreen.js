import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { makeCall } from '../services/sipService';

export default function DialerScreen({ route }) {
  const { ua } = route.params;
  const [number, setNumber] = useState('');

  const handleCall = () => {
    makeCall(ua, number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dialer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        onChangeText={setNumber}
      />
      <Button title="Call" onPress={handleCall} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
