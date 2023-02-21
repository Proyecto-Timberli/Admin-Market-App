import React, {useState } from "react";
import { Dimensions,TextInput, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, collection} from 'firebase/firestore';
import {postFirestore} from '../../functions/apiFunctions'
import ButtonNav from '../Reutilizables/ButtonNav'
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
      <Text style={{...styles.textTitle,marginTop:30}}>Desea eliminar este Providere?</Text>
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
    <Icons name="border-color" size={25} color="black" />
  </TouchableOpacity>
    
  )
}

export default function AddProvider({navigation}) {
  const {userProfile} = useAuth()
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    identifier: "",
    phone: "",
    location: "",
  })
  /////////////////////////////////////////////////
  const postProvider = (data)=>{
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/providers")
    postFirestore(selectedCollection,data)
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
  const agregar = () => {
    postProvider(editable)
    console.log("agregar")
    Alert.alert("Provedor Agregado");
    navigation.navigate("MenuPrincipal")
  }
  return (
        <LinearGradient 
                colors={[ '#F1F4F4','#DADEDF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
       <View style={styles.container}>
         {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
         {modalSalir&&<ModalSalir deleteFunction={deleteProvider}navigation={navigation}stateModal={setModalSalir}/>}
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
          
            
            <View style = {styles.containerNavBar}>   
              <ButtonNav 
                  functionNav={()=>salir()}
                  iconSelect={"delete-forever"}
                  buttonSize={30}
                  buttonName={"Salir"}/>
              <ButtonNav 
                  functionNav={()=>navigation.navigate("MenuPrincipal")}
                  iconSelect={"home"}
                  buttonSize={30}
                  buttonName={"Home"}/>
              <ButtonNav 
                  functionNav={()=>agregar()}
                  iconSelect={"content-save"}
                  buttonSize={30}
                  buttonName={"Agregar"}/>
            </View>
            
      </View>
      </LinearGradient>
  )
}



const styles = StyleSheet.create({
  container:{
    marginTop:-35,
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
