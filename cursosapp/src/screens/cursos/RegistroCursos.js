import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { agregarCursoAColeccion } from '../../utils/firebase'; // Asegúrate de importar la función agregarCursoAColeccion

export default function RegistroCursos ({ curso, onSubmit }) {
  const [nombre, setNombre] = useState(curso ? curso.nombre : '');
  const [descripcion, setDescripcion] = useState(curso ? curso.descripcion : '');
  const [precio, setPrecio] = useState(curso ? curso.precio : '');
  const [duracion, setDuracion] = useState(curso ? curso.duracion : '');
  const [fechaInicio, setFechaInicio] = useState(curso ? curso.fechaInicio : '');
  const [fechaFin, setFechaFin] = useState(curso ? curso.fechaFin : '');
  const [categoria, setCategoria] = useState(curso ? curso.categoria : '');

  const handleSubmit = async () => {
    const newCurso = {
      nombre,
      descripcion,
      precio,
      duracion,
      fechaInicio,
      fechaFin,
      categoria
    };
  
    try {
      await agregarCursoAColeccion(newCurso);
      Alert.alert('Éxito', 'Curso agregado correctamente');
      onSubmit(); // Llamar solo en caso de éxito
    } catch (error) {
      console.error('Error al agregar el curso:', error);
      
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        style={styles.input}
        placeholder="Duración"
        value={duracion}
        onChangeText={setDuracion}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de inicio"
        value={fechaInicio}
        onChangeText={setFechaInicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de fin"
        value={fechaFin}
        onChangeText={setFechaFin}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{curso ? 'Actualizar Curso' : 'Agregar Curso'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
