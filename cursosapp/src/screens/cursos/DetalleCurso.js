import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colores from '../../utils/colores';

const DetallesCurso = ({ route }) => {
  const { curso } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{curso.nombre}</Text>
      <Text style={styles.descripcion}>{curso.descripcion}</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.detalleLabel}>Precio:</Text>
        <Text style={styles.detalleValor}>{curso.precio}</Text>
      </View>
      <View style={styles.detalleContainer}>
        <Text style={styles.detalleLabel}>Duración:</Text>
        <Text style={styles.detalleValor}>{curso.duracion}</Text>
      </View>
      <View style={styles.detalleContainer}>
        <Text style={styles.detalleLabel}>Fecha de inicio:</Text>
        <Text style={styles.detalleValor}>{curso.fechaInicio}</Text>
      </View>
      <View style={styles.detalleContainer}>
        <Text style={styles.detalleLabel}>Fecha de fin:</Text>
        <Text style={styles.detalleValor}>{curso.fechaFin}</Text>
      </View>
      <View style={styles.detalleContainer}>
        <Text style={styles.detalleLabel}>Categoría:</Text>
        <Text style={styles.detalleValor}>{curso.categoria}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colores.COLOR_CELESTE,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  descripcion: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },
  detalleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detalleLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white',
  },
  detalleValor: {
    fontSize: 18,
    color: 'white',
  },
});

export default DetallesCurso;
