import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colores from '../../utils/colores';

// Array de cursos estáticos
const cursosData = [
  {
    id: '1',
    nombre: 'Curso de Programación',
    descripcion: 'Aprende a programar desde cero',
    precio: '$99',
    imagen: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    nombre: 'Curso de Diseño Gráfico',
    descripcion: 'Domina las herramientas de diseño',
    precio: '$79',
    imagen: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    nombre: 'Curso de Marketing Digital',
    descripcion: 'Aprende estrategias de marketing en línea',
    precio: '$129',
    imagen: 'https://via.placeholder.com/150',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para manejar la navegación a la pantalla de registro
  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  // Función para manejar la navegación a la pantalla de inicio de sesión
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  // Función para manejar la navegación a la pantalla de editar perfil
  const handleEditProfile = () => {
    // Navegar a la pantalla de edición de perfil
  };

  // Función para manejar la cerrar sesión
  const handleLogout = () => {
    // Realizar las acciones necesarias para cerrar sesión, como limpiar el estado de autenticación, etc.
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cursos disponibles</Text>
        {isLoggedIn ? (
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.authButton} onPress={handleLogout}>
              <Text style={styles.authButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={handleEditProfile}>
              <Text style={styles.authButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.authButton} onPress={handleRegister}>
              <Text style={styles.authButtonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
              <Text style={styles.authButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={cursosData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cursoItem}>
            <Image source={{ uri: item.imagen }} style={styles.cursoImagen} />
            <View style={styles.cursoInfo}>
              <Text style={styles.cursoNombre}>{item.nombre}</Text>
              <Text style={styles.cursoDescripcion}>{item.descripcion}</Text>
              <Text style={styles.cursoPrecio}>{item.precio}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.COLOR_CELESTE,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  authButtons: {
    flexDirection: 'row',
  },
  authButton: {
    marginLeft: 10,
    padding: 5,
  },
  authButtonText: {
    color: 'white',
  },
  cursoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  cursoImagen: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cursoInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cursoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cursoDescripcion: {
    fontSize: 16,
    color: '#555',
  },
  cursoPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colores.COLOR_MORADO,
    marginTop: 5,
  },
});

export default Home;
