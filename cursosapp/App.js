import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/cursos/Home';
import LoginScreen from './src/screens/Login';
import RegistroScreen from './src/screens/Registro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistroCursos from './src/screens/cursos/RegistroCursos';
import DetalleCurso from './src/screens/cursos/DetalleCurso';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cargar el estado de isLoggedIn desde el AsyncStorage
    const loadIsLoggedIn = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value !== null) {
          setIsLoggedIn(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error al cargar isLoggedIn desde AsyncStorage:', error);
      }
    };
    loadIsLoggedIn();
  }, []);

  // Guardar el estado de isLoggedIn en el AsyncStorage
  const saveIsLoggedIn = async (value) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar isLoggedIn en AsyncStorage:', error);
    }
  };
  const handleSubmit = () => {
    const newCurso = {
      nombre,
      descripcion,
      precio,
      duracion,
      fechaInicio,
      fechaFin,
      categoria
    };
  
    // Si se proporciona un curso existente, actualiza el curso en la base de datos
    if (curso) {
      db.collection('cursos').doc(curso.id).update(newCurso)
        .then(() => {
          Alert.alert('Éxito', 'Curso actualizado correctamente');
          onSubmit();
        })
        .catch((error) => {
          console.error('Error al actualizar el curso:', error);
          Alert.alert('Error', 'Hubo un problema al actualizar el curso');
        });
    } else {
      // Si no se proporciona un curso existente, agrega un nuevo curso a la base de datos
      agregarCursoAColeccion(newCurso)
        .then(() => {
          Alert.alert('Éxito', 'Curso agregado correctamente');
          onSubmit();
        })
        .catch((error) => {
          console.error('Error al agregar el curso:', error);
          Alert.alert('Error', 'Hubo un problema al agregar el curso');
        });
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={(value) => {
                setIsLoggedIn(value);
                saveIsLoggedIn(value);
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {(props) => (
            <LoginScreen
              {...props}
              setIsLoggedIn={(value) => {
                setIsLoggedIn(value);
                saveIsLoggedIn(value);
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="RegistroCursos">
  {(props) => <RegistroCursos {...props} onSubmit={handleSubmit} />}
</Stack.Screen>
<Stack.Screen name="DetalleCurso" component={DetalleCurso} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});