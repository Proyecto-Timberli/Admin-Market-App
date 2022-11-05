import React, {useState } from "react";
import { Dimensions,TextInput, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
////////////////////////////////////////////////////
import axios from 'axios'
const baseUrl = "https://admin-market-api.herokuapp.com" ;
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');
////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
function ModalSalir({navigation,stateModal}){
  function checkOk(){
    stateModal(false)
    navigation.navigate("MenuProductos")
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
      <Text style={{...styles.textTitle,marginTop:30}}>Desea cancelar y salir?</Text>
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
      colors={colorA}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={styles.modal}>
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



export default function AgregarUno({navigation}) {
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    name: "",
    price: "",
    stock : "",
    categoriesids: "",
    make: "",
    // precioAnterior : "",
    buyprice: "",
    // codigo : "",
    // description: "",
    // imagen : "",
  })
  /////////////////////////////////////////////////
  const[modal,setModal]= useState(false)
  const[dato,setDato]= useState(false)
  const[modalSalir,setModalSalir]= useState(false)
  const salir = () => {
    console.log("salir")
    setModalSalir(true)
  }
  /////////////////////////////////////////////////
  const postProductos=(productos)=>{
      axios.post(baseUrl+"/api/product",productos
      )
      .then(function (response) {
          console.log(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
  }
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  const agregar = () => {
    postProductos({products:[editable]})
    console.log("agregar")
    Alert.alert("Producto agregado")
    navigation.navigate("MenuProductos")
  }
  
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  return (
    <LinearGradient 
      colors={colorBackgroundModal}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={{width:width,height:height}}>
      <View style={styles.container}>
        {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
        {modalSalir&&<ModalSalir navigation={navigation}stateModal={setModalSalir}/>}
        <View style={{...styles.cotainerTitle}}>
          <Text style = {styles. textTitle}>Agregar Producto</Text>
        </View> 

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}>       
          <Text style = {styles.text}> Nombre del producto: {editable.name} </Text>
          <Editar dato={"name"} setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}>    
          <Text style = {styles.text}> Precio: {editable.price}</Text>
          <Editar dato={"price"} setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}>    
          <Text style = {styles.text}> Stock: {editable.stock}</Text>
          <Editar dato={"stock"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Categoria: {editable.categoriesids}</Text>
          <Editar dato={"categoriesids"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Marca: {editable.make} </Text>
          <Editar dato={"make"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Precio anterior: {editable.precioAnterior} </Text>
          <Editar dato={"precioAnterior"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Precio de compra: {editable.buyprice} </Text>
          <Editar dato={"buyprice"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Codigo: {editable.codigo} </Text>
          <Editar dato={"codigo"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Informacion: {editable.description} </Text>
          <Editar dato={"description"}setState={setDato} stateModal={setModal}/>
          </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Imagen: {editable.imagen} </Text>
          <Editar dato={"imagen"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>
          <View style = {styles.containerNavBar}>   
            <TouchableOpacity style={styles.buttom} onPress={()=>salir()}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:iconColorA,offset:"0",opacity:"1"},
                        {color:iconColorB,offset:"1",opacity:"1"},
                    ]}
                    name="delete-forever" type="material-community" />  
                    <Text style={styles.textNavBar}>Salir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("MenuPrincipal")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:iconColorA,offset:"0",opacity:"1"},
                        {color:iconColorB,offset:"1",opacity:"1"},
                    ]}
                    name="home" type="material-community" />  
                    <Text style={styles.textNavBar}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttom} onPress={()=>agregar()}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:iconColorA,offset:"0",opacity:"1"},
                        {color:iconColorB,offset:"1",opacity:"1"},
                    ]}
                    name="content-save" type="material-community" />  
                    <Text style={styles.textNavBar} >Agregar</Text>
            </TouchableOpacity>
          </View>
      </View>
    </LinearGradient>
           
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
  textBoton : {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',               
  } ,
  boton : {
    width: '25%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    backgroundColor: "red",
  },
  container: {
    marginTop: "25%",
    width: '100%',
    height: 90,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    elevation: 0,
    flexDirection: 'row',
}
})
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
