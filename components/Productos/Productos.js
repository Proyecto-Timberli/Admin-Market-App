import React from "react";
import { View } from "react-native";
import CardProducto from "./Card-Producto";

const Productos = () => {
  let numero = [0, 1, 2, 3];
  return (
    <View>
      {numero.map((e) => {
        return <CardProducto key={e} />;
      })}
    </View>
  );
};

export default Productos;
