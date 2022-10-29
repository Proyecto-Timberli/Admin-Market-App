import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { TextInput, Alert, Pressable, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

function Modal({dato, state, setState, stateModal}){
  const [editado, setEditado]=useState(state[dato])
  function modalHandler(e){
    setEditado(e)
  }
  function checkOk(){
    setState({
      ...state,
      [dato]:editado
    })
    stateModal(false)
  }
  function exit(){
    stateModal(false)
  }
  return (
    <View style={estilos.modal}>
      <Text style={estilos. textTitle} ></Text>
      <TextInput
            style={estilos.busqueda}
            onChangeText={(e) => modalHandler(e)}
            value={editado}
          />
      <View style={estilos.modal2}>
        <TouchableOpacity onPress={()=>checkOk()}><Icon name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
        <TouchableOpacity onPress={()=>exit()}><Icon name="close-box" size={35} color="red" /></TouchableOpacity> 
      </View>   
    </View>
  )
}




function Editar({dato, setState, stateModal }){
  const edit = ()=>{
    setState(dato)
    console.log("edit "+ dato)
    stateModal(true)
  }
  return (
    <TouchableOpacity
      onPress={()=> edit()}>
      <Icon name="border-color" size={25} color="black" />
    </TouchableOpacity>
  )
}





export default function InformacionProducto({id,nombre,precio,stock,categoria,marca,precioCompra,informacionProducto,imagen,setInfo}) {
  const navigation = useNavigation();
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    id:id,
    name: nombre,
    price: precio,
    stock : stock,
    categoriesids: categoria,
    make: marca,
    // precioAnterior : productoInfo[0].precioAnterior,
    buyprice: precioCompra,
    // codigo : productoInfo[0].codigo,
    // description: informacionProducto,
    // imagen : imagen,
  })
  /////////////////////////////////////////////////
  const baseUrl = "https://admin-market-api.herokuapp.com" ;
  const putProductos=(productos)=>{
      axios.put(baseUrl+"/api/product",productos
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /////////////////////////////////////////////////
  const deleteProductos=(productos)=>{
    axios.delete(baseUrl+"/api/product",{ data: productos})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    });
  }
  /////////////////////////////////////////////////
  const[modal,setModal]= useState(false)
  const[dato,setDato]= useState(false)
  const salir = () => {
    console.log("salir")
    setInfo(false)
  }
  const eliminar = () => {
    deleteProductos({products:[editable]})
    console.log("eliminar")
    Alert.alert("Producto Eliminado");
    setInfo(false)
  }
  const guardar = () => {
    putProductos({products:[editable]})
    console.log("guardar")
    Alert.alert("Producto Actualizado");
  }
  return (
       <View>
         {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
            <Text></Text>
            <Text></Text>
            <Text style = {estilos. textTitle}>Informacion del Producto: {id}</Text>
            <Text></Text>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
            <Text style = {estilos.text}> Nombre del producto: {editable.name} </Text>
            <Editar dato={"name"} setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text> 
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Precio: {editable.price}</Text>
              <Editar dato={"price"} setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Stock: {editable.stock}</Text>
              <Editar dato={"stock"}setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Categoria: {editable.categoriesids}</Text>
              <Editar dato={"categoriesids"}setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Marca: {editable.make} </Text>
              <Editar dato={"make"}setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Precio anterior: {editable.precioAnterior} </Text>
              <Editar dato={"precioAnterior"}setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Precio de compra: {editable.buyprice} </Text>
              <Editar dato={"buyprice"}setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Codigo: {editable.codigo} </Text>
              <Editar dato={"codigo"}setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Informacion: {editable.description} </Text>
              <Editar dato={"description"}setState={setDato} stateModal={setModal}/>
            </View>
            <Text></Text>
            <View style={estilos.cotainerIcon}>
              <Text style = {estilos.text}> Imagen: {editable.imagen} </Text>
              <Editar dato={"imagen"}setState={setDato} stateModal={setModal}/>
            </View>
            {/* <View style={estilos.container}>
              <TouchableOpacity onPress={()=>salir()} style={estilos.boton}><Text style={estilos.textBoton }>Salir</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>eliminar()} style={estilos.boton}><Text style={estilos.textBoton }>Eliminar</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>guardar()} style={{...estilos.boton, backgroundColor: "green"}}><Text style={estilos.textBoton }>Guardar</Text></TouchableOpacity>
            </View> */}
            <View style={estilos.containerNavBar}>     
              <TouchableOpacity onPress={()=>eliminar()} style={estilos.botonNavBar}><LinearGradient  colors={[ '#ff7f49','#f23c3c', '#d20038']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar}>Eliminar</Text></LinearGradient></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("MenuPrincipal")}style={estilos.botonNavBar}><LinearGradient  colors={[ '#54b2f5','#9fa5f1', '#dc92cf']} style={{...estilos.botonNavBar,width: '100%'}}><Icon name="home" size={35} color="white" /></LinearGradient></TouchableOpacity>
              <TouchableOpacity onPress={()=>guardar()}style={estilos.botonNavBar}><LinearGradient  colors={['#3cf23c', '#00dea1']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar }>Guardar</Text></LinearGradient></TouchableOpacity>
            </View>
            
      </View>
  )
}



const estilos = StyleSheet.create({
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
      // position: "absolute",
      bottom: 0,
      marginTop: "25%",
      width: '100%',
      height: 90,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
  },
  busqueda: {
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    width: 200,
    elevation: 8,
    borderWidth: 1,
    backgroundColor: "white",
  },
  modal2:{
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  modal:{
    zIndex: 10,
    marginTop: "30%",
    position: "absolute",
    width: '90%',
    marginLeft: '5%',
    height: 300,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 0,
    elevation: 10,
    flexDirection: 'column',
  },
  cotainerIcon: {
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    elevation: 0,
    flexDirection: 'row',
  },
  textTitle : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',    
    marginLeft: 50           
  } ,
  text : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',    
    marginLeft: 30           
  } ,
})
