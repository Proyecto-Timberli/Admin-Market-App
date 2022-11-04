import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Dimensions,TextInput, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { Icon } from 'react-native-gradient-icon';
const {width, height} = Dimensions.get('window');
const iconSize= 50;


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
    <View style={styles.modalContainer}>
    <LinearGradient 
      colors={[ '#F8E9E9','#B9C7CA']}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={styles.modal}>
      <Text style={styles. textTitle} ></Text>
      <TextInput
            style={styles.textInput}
            onChangeText={(e) => modalHandler(e)}
            value={editado?.toString()}
          />
      <View style={styles.modalButtonsContainers}>
        <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
        <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
      </View> 
    </LinearGradient>
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
      <Icon  
          size={25}
          colors={[
            {color:"#206593",offset:"0",opacity:"1"},
            {color:"#25EADE",offset:"1",opacity:"1"},
          ]}
          name="pencil" type="material-community" /> 
    </TouchableOpacity>
    
  )
}





export default function InformacionProducto({navigation,route}) {
  const {amount, buyprice, categories, description,id,image, make, name, price, stock} = route.params
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    id:id,
    name: name,
    price: price,
    stock : stock,
    categoriesids: categories,
    make: make,
    buyprice: buyprice,
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
    navigation.navigate("Productos")
  }
  const eliminar = () => {
    deleteProductos({products:[editable]})
    console.log("eliminar")
    Alert.alert("Producto Eliminado");
    navigation.navigate("Productos")
  }
  const guardar = () => {
    putProductos({products:[editable]})
    console.log("guardar")
    Alert.alert("Producto Actualizado");
    navigation.navigate("Productos")
  }
  return (
        <LinearGradient 
                colors={[ '#F1F4F4','#DADEDF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
       <View style={styles.container}>
         {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
            <View style={{...styles.cotainerTitle}}>
              <Text style = {styles. textTitle}>Informacion del Producto: {id}</Text>
            </View> 

            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>       
              <Text style = {styles.text}> Nombre del producto: {editable.name} </Text>
              <Editar dato={"name"} setState={setDato} stateModal={setModal}/>
            </LinearGradient>
           
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>    
              <Text style = {styles.text}> Precio: {editable.price}</Text>
              <Editar dato={"price"} setState={setDato} stateModal={setModal}/>
              </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>    
              <Text style = {styles.text}> Stock: {editable.stock}</Text>
              <Editar dato={"stock"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Categoria: {editable.categoriesids}</Text>
              <Editar dato={"categoriesids"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
           
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Marca: {editable.make} </Text>
              <Editar dato={"make"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Precio anterior: {editable.precioAnterior} </Text>
              <Editar dato={"precioAnterior"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Precio de compra: {editable.buyprice} </Text>
              <Editar dato={"buyprice"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Codigo: {editable.codigo} </Text>
              <Editar dato={"codigo"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Informacion: {editable.description} </Text>
              <Editar dato={"description"}setState={setDato} stateModal={setModal}/>
              </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Imagen: {editable.imagen} </Text>
              <Editar dato={"imagen"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            <View style = {styles.containerNavBar}>   
            <TouchableOpacity style={styles.buttom} onPress={()=>eliminar()}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="delete-forever" type="material-community" />  
                    <Text style={styles.textNavBar}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("MenuPrincipal")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="home" type="material-community" />  
                    <Text style={styles.textNavBar}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttom} onPress={()=>guardar()}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="content-save" type="material-community" />  
                    <Text style={styles.textNavBar} >Guardar</Text>
            </TouchableOpacity>
            </View>
            
      </View>
      </LinearGradient>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    width:width, height:height,
  },
  textNavBar : {
      textAlign: "center",
      fontSize: 14,
      fontWeight: 'bold',
      color: 'black',               
  } ,

  containerNavBar: {
      position: "absolute",
      bottom: -20,
      width: '100%',
      height: 70,
       backgroundColor: '#fff',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
  },
  modalButtonsContainers:{
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  modal:{
    zIndex: 10,
    marginTop: "60%",
    position: "absolute",
    width: '90%',
    marginLeft: '5%',
    height: "30%",
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 0,
    elevation: 10,
    flexDirection: 'column',
  },
  modalContainer:{
    zIndex: 10,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cotainerIcon: {
    width: width*0.9,
    backgroundColor: '#fff',
    flexWrap:"wrap",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding:5,
    margin:10
  },
  cotainerTitle: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding:5,
    marginTop: 40,
  },
  textTitle : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',            
  } ,
  text : {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',  
    width:"90%"          
  } ,
   textInput:{
    padding: 10,
    paddingStart:30,
    width:width*0.5,
    height:50,
    marginTop:20,
    borderBottomWidth:2,
    borderBottomColor:"#2C7DA0",
  },
})
