import React , {useEffect, useState} from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


const CardProducto = ({id,total,fecha,resumen})=>{
    const navigation = useNavigation();
    return (
        <>
           
                <View style={estilo.lista}>
                    <Text style={estilo.texto1}>{id}</Text>
                    <Text style={estilo.texto2}>{total}</Text>
                    <Text style={estilo.texto3}>{fecha} </Text>
                </View>
            
            
        </>
    );
};
  
  let estilo = StyleSheet.create({
    listaCart: {
      flex: 1,
      backgroundColor: "green",
      marginTop:0,
      marginBottom:5,
      elevation: 1,
      flexDirection: "row",
      height: 40,
      alignItems: "center",
      padding: 10,
      justifyContent:"space-around",
  },
    lista: {
      flex: 1,
      backgroundColor: "#F8E9E9",
      margin: 5,
      elevation: 1,
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      justifyContent:"space-between",
    },
    texto1: { color: "black", width: "30%" },
    texto2: { color: "black", textAlign: "center", width: "30%" },
    texto3: { color: "black", textAlign: "right", width: "30%" },
  });
  
  export default CardProducto;