////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
////////////////////////////////////////////////////
import axios from 'axios'
const baseUrl = "https://admin-market-api.herokuapp.com" ;
////////////////////////////////////////////////////
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
const Loading =()=>{
  return (
    <View style={[styles.Loading]}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default function NuevaCategoria({navigation}){
  /////////////////////////////////////////////////
  const [categoriasApi,setCategoriasApi]= useState(null)
  const peticionProductos=()=>{
      axios.get(baseUrl+"/api/category"
      )
      .then(function (response) {
        setCategoriasApi(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [responseApi,setResponseApi]= useState(null)
  useEffect(() => {
      peticionProductos()
  },[]);
  useEffect(() => {
    console.log("responseApi")
    console.log(responseApi)
    if (responseApi==="categoria creada"){
      peticionProductos()
      setCategoria("")
      setResponseApi(null)
      setLoadingOn(false);
    }
    if (responseApi==="categoria eliminada"){
      peticionProductos()
      setCategoria("")
      setResponseApi(null)
      setLoadingOn(false);
    }
},[responseApi]);
  /////////////////////////////////////////////////
  const deleteCategory=(category)=>{
    axios.delete(baseUrl+"/api/category",{ data: category})
    .then(function (response) {
      console.log(response.data);
      setResponseApi(response.data)
    })
    .catch(function (error){
      console.log(error);
      setResponseApi(error)
    });
  }
  /////////////////////////////////////////////////
  const postCategory=(category)=>{
    axios.post(baseUrl+"/api/category",category
    )
    .then(function (response) {
      console.log(response.data);
      setResponseApi("categoria creada")
    })
    .catch(function (error) {
      console.log(error);
      setResponseApi(error)
    });
  }
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  const [categoria, setCategoria] = useState("");
  const [text, setText] = useState("");
  const [loadingOn, setLoadingOn] = useState(false)
  const agregarCategoria = function (e) {
    function namesCategorias(categorias){
      let result=[]
      for(let i=0;i<categorias.length;i++){
       result.push(categorias[i].name)
      }
      return result
    }
    if (e.name == "") {
      Alert.alert("Debes completar los campos");
      return;
    }
    if (namesCategorias(categoriasApi).includes(e.name)) {
      Alert.alert("Esa categoria ya existe!");
      return;
    }
    console.log("agregar categoria")
    setLoadingOn(true);
    postCategory(e)
    peticionProductos()
    setText("")
    Alert.alert("Categoria agregada");
  };
  const eliminarCategoria = async function (e) {
    console.log("eliminar categoria")
    deleteCategory(categoria)
    setLoadingOn(true);
    Alert.alert("Categoria Eliminada");
  };

  return (
    <LinearGradient 
    colors={colorBackgroundModal}
    start={{x:1,y:0}}
    end={{x:0,y:1}}
    style={{width:width,height:height}}>
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <View style={styles.categoriasContainer}>
      {!categoriasApi||loadingOn?<Loading/>:
        <FlatList
          data={categoriasApi}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => setCategoria(item)}>
                <LinearGradient 
                    colors={categoria === item?colorB:colorA}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}}
                    style={styles.categorias}>    
                  <Text style={categoria === item? {...styles.text,color:"white"}: styles.text}>{item.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
        />}
      </View>  
      {categoria ? (
        <TouchableOpacity style={styles.deleteCategoria} onPress={() => eliminarCategoria(categoria)}>
        <Icon  
            size={iconSize}
            colors={[
                {color:"red",offset:"0",opacity:"1"},
                {color:"black",offset:"1",opacity:"1"},
            ]}
            name="delete-forever" type="material-community" />  
            <Text style={styles.textNavBar}>Eliminar</Text>
        </TouchableOpacity>
          
      ) : null}
      <View style={styles.contenedorInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Escriba su nueva categoria aquí..."
          onChangeText={(e) => setText(e)}
          value={text}
        />
      </View>  
       {/* NavBar() -------------------------------------------*/}
       <View style = {styles.containerNavBar}>   
                            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("MenuProductos")}>
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
                            <TouchableOpacity style={styles.buttom} onPress={() => agregarCategoria({name:text})}>
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
    
  );
};
const styles = StyleSheet.create({
  container:{
    marginTop:25,
    flex:1,
    width:width, height:height,
    alignItems:"center",
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom:10,
  },
  categoriasContainer:{
    alignItems:"center",
    width:width, 
    height:height*0.6,
  },
  categorias:{
    margin:5,
    padding:5,
    width:width*0.8,
    borderRadius:15,
  },
  text:{
    textAlign: "center",
    color: 'black',  
    fontSize: 18,
    fontWeight: 'bold',             
  },
  contenedorInput:{
    bottom: 10,
    width:width,
    height:height*0.16,
    alignItems:"center",
  },
  textInput:{
    padding: 10,
    paddingStart:30,
    width:width*0.7,
    height:50,
    marginTop:20,
    borderBottomWidth:2,
    borderBottomColor:"#2C7DA0",
  },
     /* NavBar() -------------------------------------*/
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
    /* Loading() -------------------------------------*/
    Loading: {
      flex: 1,
      justifyContent: "center"
    },
})
