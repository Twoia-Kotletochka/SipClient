import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initSIP } from '../services/sipService';

export default function LoginScreen({ navigation }) {
  const [uri, setUri] = useState('');
  const [password, setPassword] = useState('');
  const [wsUri, setWsUri] = useState('wss://sip.example.com:7443');

  const handleLogin = async () => {
    try {
      const ua = initSIP({ uri, password, wsUri });
      await AsyncStorage.setItem('sipConfig', JSON.stringify({ uri, password, wsUri }));
      navigation.navigate('Dialer', { ua });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIP Login</Text>
      <TextInput
        style={styles.input}
        placeholder="SIP URI (e.g., sip:1001@sip.example.com)"
        onChangeText={setUri}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
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
