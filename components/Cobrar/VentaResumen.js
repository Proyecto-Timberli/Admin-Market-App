import React , {useEffect, useState} from "react";
import { StyleSheet, Alert, Text, View, TouchableOpacity ,FlatList} from "react-native";
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
const VentaResumen = ({route,navigation})=>{
  /////////////////////////////////////////////////////////
  const {id,resumen,fecha,total}=route.params
  const data = resumen.resumen
  /////////////////////////////////////////////////////////
  const baseUrl = "https://admin-market-api.herokuapp.com"
  const deleteVenta=(venta)=>{
    axios.delete(baseUrl+"/api/venta",{ data: venta})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    });
  }
  /////////////////////////////////////////////////////////
  const anular = () => {
    deleteVenta({id:id})
    console.log("anular")
    Alert.alert("Venta Anulada");
    navigation.navigate("MenuPrincipal")
  }
    return (
        <>
            <View style={{flex: 1}}>
                <View style={estilo.lista}>
                    <Text style={estilo.texto4}>Nro de venta: {id}</Text>
                    <Text style={estilo.texto4}>Fecha: {fecha} </Text>
                </View>
                <View style={{height:670}}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                                <View style={estilo.lista2}>
                                    <Text style={estilo.texto4}>{item.name}</Text>
                                    <Text style={estilo.texto4}>{item.price}</Text>
                                    <Text style={estilo.texto4}>Cantidad: {item.ammount}</Text>
                                    <Text style={estilo.texto4}>{item.price*item.ammount}</Text>
                                </View>            
                        );
                    }}
                />
                <View style={{height:150}}>
                  <Text style={estilo.texto1}>Total: {total}</Text>
                </View>
                <View style={estilo.containerNavBar}>     
                  <TouchableOpacity onPress={() => anular()} style={estilo.botonNavBar}><LinearGradient  colors={[ '#ff7f49','#f23c3c', '#d20038']} style={{...estilo.botonNavBar,width: '100%'}}><Text style={estilo.textNavBar}>Anular</Text></LinearGradient></TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("MenuPrincipal")}style={estilo.botonNavBar}><LinearGradient  colors={[ '#54b2f5','#9fa5f1', '#dc92cf']} style={{...estilo.botonNavBar,width: '100%'}}><Icon name="home" size={35} color="white" /></LinearGradient></TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("comprobante")}style={estilo.botonNavBar}><LinearGradient  colors={['#3cf23c', '#00dea1']} style={{...estilo.botonNavBar,width: '100%'}}><Text style={estilo.textNavBar }>Resumen</Text></LinearGradient></TouchableOpacity>
                </View>
            </View>
            </View>  
        </>
    );
};
  
  let estilo = StyleSheet.create({
    textNavBar : {
      textAlign: "center",
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',               
  } ,
    botonNavBar : {
      width: '23%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },  shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
      backgroundColor: "green",
  },
    containerNavBar: {
      position: "absolute",
      bottom: 0,
      marginTop: "25%",
      width: '100%',
      height: 90,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
  },
    lista2: {
      flex: 1,
      backgroundColor: "#F8E9E9",
      margin: 5,
      elevation: 1,
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      justifyContent: 'space-between',
    },

    lista: {
      height:60,
      backgroundColor: "#F8E9E9",
      margin: 5,
      elevation: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: 10,
    },
    texto1: { 
      textAlign: "right",
      marginRight:30,
      marginTop:13,
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',      },
    texto4: { color: "black"},
  });
  
  export default VentaResumen;