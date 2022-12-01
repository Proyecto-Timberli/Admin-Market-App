import React, {useState } from "react";
import { Dimensions,TextInput, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
////////////////////////////////////////////////////
import {getFirestore, doc} from 'firebase/firestore';
import {putFirestore, deleteFirestore} from '../../functions/apiFunctions'
////////////////////////////////////////////////////
const {width, height} = Dimensions.get('window');
////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
function ModalSalir({deleteFunction,navigation,stateModal}){
  function checkOk(){
    deleteFunction()
    Alert.alert("Producto Eliminado");
    stateModal(false)
    navigation.navigate("Home")
  }
  function exit(){
    stateModal(false)
  }
  return (
    <View style={styles.modalContainer}>
    <LinearGradient 
      colors={colorA}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={styles.modal}>
      <Text style={{...styles.textTitle,marginTop:30}}>Desea eliminar el producto?</Text>
      <View style={styles.modalButtonsContainers}>
        <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
        <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
      </View> 
    </LinearGradient>
    </View>
  )
}
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

export default function InformationProvider({navigation,route}) {
  const {id, identifier, phone, location} = route.params
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    id:id,
    identifier: identifier,
    phone: phone,
    location: location,
  })
  /////////////////////////////////////////////////
  const putClient = (data)=>{
    const selected = doc(getFirestore(), "users/qDcRzymTV7Op7jTwyZdeu7TxhUM2/providers", id)
    putFirestore(selected,data)
  }
  
  const deleteClient = ()=>{
    const selected = doc(getFirestore(), "users/qDcRzymTV7Op7jTwyZdeu7TxhUM2/providers", id)
    deleteFirestore(selected)
  }

  /////////////////////////////////////////////////
  const[modal,setModal]= useState(false)
  const[dato,setDato]= useState(false)
  const[modalSalir,setModalSalir]= useState(false)
  const salir = () => {
    navigation.navigate("Providers")
  }
  const eliminar = () => {
    console.log("eliminar")
    setModalSalir(true)
  }
  const guardar = () => {
    putClient(editable)
    console.log("guardar")
    Alert.alert("Provedor Actualizado");
    navigation.navigate("Home")
  }
  return (
        <LinearGradient 
                colors={[ '#F1F4F4','#DADEDF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
       <View style={styles.container}>
         {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
         {modalSalir&&<ModalSalir deleteFunction={deleteClient}navigation={navigation}stateModal={setModalSalir}/>}
            <View style={{...styles.cotainerTitle}}>
              <Text style = {styles. textTitle}>Provedor: {editable.identifier}</Text>
            </View> 

            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>       
              <Text style = {styles.text}> Nombre: {editable.identifier} </Text>
              <Editar dato={"identifier"} setState={setDato} stateModal={setModal}/>
            </LinearGradient>
           
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>    
              <Text style = {styles.text}> Telfono: {editable.phone}</Text>
              <Editar dato={"phone"} setState={setDato} stateModal={setModal}/>
              </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>    
              <Text style = {styles.text}> Ubicacion: {editable.location}</Text>
              <Editar dato={"location"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            <LinearGradient 
              colors={colorB}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.button}>       
              <Text style = {styles.textButton}>Historial de compras</Text>
            </LinearGradient>
            <LinearGradient 
              colors={colorB}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.button}>       
              <Text style = {styles.textButton}>Pedidos de compra</Text>
            </LinearGradient>
            
          
            <View style = {styles.containerNavBar}>   
            <TouchableOpacity  onPress={()=>eliminar()}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="delete-forever" type="material-community" />  
                    <Text style={styles.textNavBar}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("MenuPrincipal")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="home" type="material-community" />  
                    <Text style={styles.textNavBar}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>guardar()}>
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
    marginTop:25,
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
  button: {
    width: width*0.45,
    alignItems: 'center',
    padding:5,
    margin:10,
    borderRadius:15
  },
  textButton : {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',  
    width:"90%",
    textAlign:"center"

  } ,
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
