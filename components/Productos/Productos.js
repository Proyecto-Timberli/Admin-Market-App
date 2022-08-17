import React from "react";
import { View } from "react-native";
import CardProducto from "./Card-Producto";

const Productos = () => {
  let numero = [
    { id: 1, nombre: "Queso", categoria: "Lacteo", precio: "600" },
    { id: 2, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 3, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
  ];
  return (
    <View>
      {numero.map((e) => {
        return (
          <CardProducto
            key={e.id}
            nombre={e.nombre}
            categoria={e.categoria}
            precio={e.precio}
          />
        );
      })}
    </View>
  );
};

export default Productos;
