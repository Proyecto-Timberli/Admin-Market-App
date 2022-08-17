import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CardProducto = () => {
  return (
    <View style={estilo.lista}>
      <Text style={estilo.texto}>Nombre</Text>
      <Text style={estilo.texto}>Categoria</Text>
      <Text style={estilo.texto}>Precio </Text>
    </View>
  );
};

let estilo = StyleSheet.create({
  lista: {
    displey: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  texto: { color: "black" },
});

export default CardProducto;
