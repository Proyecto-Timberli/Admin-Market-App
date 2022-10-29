import React , {useState} from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
const CardProducto = ({ id, nombre, categoria, precio, product,onPress}) => {
  const navigation = useNavigation();

    return (
      <>
        <View
          style={estilo.lista}>
          <Text style={estilo.texto1}>{nombre}</Text>
          <Text style={estilo.texto2}>{categoria}</Text>
          <Text style={estilo.texto3}>{precio} </Text>
          <TouchableOpacity onPress={()=>onPress(product)}><Icon name="cart-plus" size={26} color={'#212121'}/></TouchableOpacity>
        </View>
      </>
    );
  


};

let estilo = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: "#F8E9E9",
    margin: 5,
    zIndex: 1,
    elevation: 1,
    flexDirection: "row",

    height: 40,
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  listaSelect: {
    flex: 1,
    backgroundColor: "green",
    margin: 5,
    zIndex: 1,
    elevation: 1,
    flexDirection: "row",

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
