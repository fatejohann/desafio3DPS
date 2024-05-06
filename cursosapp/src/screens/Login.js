// Login.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase'; // Asegúrate de importar auth también

import colores from '../utils/colores';

export default function Login({ setIsLoggedIn }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Iniciar sesión con el correo electrónico y la contraseña
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar el estado de isLoggedIn a true después de un inicio de sesión exitoso
      setIsLoggedIn(true);

      // Redirigir al usuario a la pantalla principal después de iniciar sesión
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      Alert.alert("Error", "Correo electrónico o contraseña incorrectos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CursosApp</Text>
        <Text style={styles.text}>BIENVENIDO</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Ingresa tus datos</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            placeholder='Ingresa tu email'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            placeholder='Ingresa tu Contraseña'
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.buttonText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.COLOR_CELESTE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 45,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  contentText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: colores.COLOR_MORADO,
    marginBottom: 10,
  },
  registerButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: colores.COLOR_ANARANJADO,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
  },
});
