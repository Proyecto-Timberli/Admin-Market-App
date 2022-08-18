import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CardProducto from "./Card-Producto";

const Productos = () => {
  let numero = [
    { id: 1, nombre: "Queso", categoria: "Lacteo", precio: "600" },
    { id: 2, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 3, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
    { id: 4, nombre: "Queso", categoria: "Lacteo", precio: "600" },
    { id: 5, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 6, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
    { id: 7, nombre: "Queso", categoria: "Lacteo", precio: "600" },
    { id: 8, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 9, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
    { id: 10, nombre: "Queso", categoria: "Lacteo", precio: "600" },
    { id: 11, nombre: "Queso", categoria: "Lacteo", precio: "600" },
    { id: 12, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 13, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
    { id: 14, nombre: "Queso", categoria: "Lacteo", precio: "600" },
    { id: 15, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 16, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
  ];
  return (
    <View style={estilos.lista}>
      <FlatList
        data={numero}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <CardProducto
              key={item.id}
              nombre={item.nombre}
              categoria={item.categoria}
              precio={item.precio}
            />
          );
        }}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  lista: { alignItems: "center" },
});

export default Productos;
