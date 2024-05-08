import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/cursos/Home';
import LoginScreen from './src/screens/Login';
import RegistroScreen from './src/screens/Registro';
import AsyncStorage from '@react-native-async-storage/async-storage';

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