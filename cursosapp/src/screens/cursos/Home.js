import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import colores from '../../utils/colores';

const Home = ({ navigation, isLoggedIn, setIsLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cursosData, setCursosData] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const db = getFirestore();
      const cursosCollection = collection(db, 'cursos');
      const cursosSnapshot = await getDocs(cursosCollection);
      const cursosList = cursosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCursosData(cursosList);
    };

    fetchCursos();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleRegistroCursos = () => {
    navigation.navigate('RegistroCursos');
  };

  const renderCursoItem = ({ item }) => (
    <TouchableOpacity style={styles.cursoItem}>
      <Image source={{ uri: item.imagen }} style={styles.cursoImagen} />
      <View style={styles.cursoInfo}>
        <Text style={styles.cursoNombre}>{item.nombre}</Text>
        <Text style={styles.cursoDescripcion}>{item.descripcion}</Text>
        <Text style={styles.cursoPrecio}>{item.precio}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cursos disponibles</Text>
        {isLoggedIn ? (
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.authButton} onPress={() => setIsLoggedIn(false)}>
              <Text style={styles.authButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('EditarPerfil')}>
              <Text style={styles.authButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.authButtonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.authButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegistroCursos}>
        <Text style={styles.buttonText}>Registrar Cursos</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Buscar cursos por nombre"
      />
      <FlatList
        data={cursosData.filter(curso => curso.nombre.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderCursoItem}
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
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
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
