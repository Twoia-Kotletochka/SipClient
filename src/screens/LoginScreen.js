import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initSIP } from '../services/sipService';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState(''); // Имя пользователя
  const [password, setPassword] = useState(''); // Пароль
  const [sipServer, setSipServer] = useState(''); // SIP сервер (например, sip.example.com)

  const handleLogin = async () => {
    try {
      // Формируем SIP URI
      const uri = `sip:${username}@${sipServer}`;
      const wsUri = `wss://${sipServer}:5061`; // Пример для WebSocket URI

      // Инициализация SIP
      const ua = initSIP({ uri, password, wsUri });
      
      // Сохранение данных
      await AsyncStorage.setItem('sipConfig', JSON.stringify({ uri, password, wsUri }));
      
      // Переход на экран Dialer с переданными данными
      navigation.navigate('Dialer', { ua });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIP Login</Text>
      
      {/* Ввод имени пользователя */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
      />
      
      {/* Ввод пароля */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      
      {/* Ввод SIP-сервера */}
      <TextInput
        style={styles.input}
        placeholder="SIP Server (e.g., sip.example.com)"
        onChangeText={setSipServer}
      />
      
      {/* Кнопка для входа */}
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
