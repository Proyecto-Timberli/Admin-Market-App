import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CardProducto = ({ nombre, categoria, precio }) => {
  return (
    <View style={estilo.lista}>
      <Text style={estilo.texto1}>{nombre}</Text>
      <Text style={estilo.texto2}>{categoria}</Text>
      <Text style={estilo.texto3}>{precio} </Text>
    </View>
  );
};

let estilo = StyleSheet.create({
  lista: {
    backgroundColor: "#F8E9E9",
    margin: 5,
    displey: "flex",
    flexDirection: "row",
    width: "95%",
    height: 40,
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  texto1: { color: "black", width: "30%" },
  texto2: { color: "black", textAlign: "center", width: "30%" },
  texto3: { color: "black", textAlign: "right", width: "30%" },
});

export default CardProducto;
