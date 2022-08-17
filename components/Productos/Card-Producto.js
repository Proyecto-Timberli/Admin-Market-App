import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CardProducto = ({ nombre, categoria, precio }) => {
  return (
    <View style={estilo.lista}>
      <Text style={estilo.texto}>{nombre}</Text>
      <Text style={estilo.texto}>{categoria}</Text>
      <Text style={estilo.texto}>{precio} </Text>
    </View>
  );
};

let estilo = StyleSheet.create({
  lista: {
    displey: "flex",
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
  },
  texto: { color: "black" },
});

export default CardProducto;
