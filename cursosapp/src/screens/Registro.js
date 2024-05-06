import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, guardarUsuarioEnFirestore } from '../utils/firebase'; // Asegúrate de importar la función guardarUsuarioEnFirestore

import colores from '../utils/colores';

export default function Registro() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async () => {
    try {
      // Crear el usuario con el correo electrónico y la contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar la información adicional del usuario en Firestore
      await guardarUsuarioEnFirestore(user.uid, nombre);

      // Alerta y redirección
      Alert.alert("Registro exitoso", "¡Tu cuenta ha sido creada exitosamente!");
      navigation.navigate('Login'); // Redirigir al usuario al inicio de sesión
    } catch (error) {
      console.error("Error al registrar usuario: ", error);
      Alert.alert("Error", "No se pudo completar el registro. Por favor, intenta de nuevo más tarde.");
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginLink} onPress={handleNavigateToLogin}>
        <Text style={styles.loginLinkText}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.COLOR_CELESTE,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    width: '80%',
    backgroundColor: colores.COLOR_MORADO,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 10,
  },
  loginLinkText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
