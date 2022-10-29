import React, {useEffect, useState } from "react";
import axios from 'axios' ;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function NuevaCategoria(){
  /////////////////////////////////////////////////
  const navigation = useNavigation();
  const baseUrl = "https://admin-market-api.herokuapp.com" ;
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
  useEffect(() => {
      peticionProductos()
  },[]);
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  const [categoria, setCategoria] = useState("");

  const [text, setText] = useState("");

  const agregarCategoria = function (e) {
    function namesCategorias(categorias){
      let result=[]
      for(let i=0;i<categorias.length;i++){
       result.push(categorias[i].name)
      }
      return result
    }
    if (e.name == "") {
      Alert.alert("Escribí una Categoria");
      return;
    }
    if (namesCategorias(categoriasApi).includes(e.name)) {
      Alert.alert("Esa categoria ya existe!");
      return;
    }
    axios.post(baseUrl+"/api/category",e
    )
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    // funcion post
    console.log("agregar categoria")
    peticionProductos()
    setText("")
    Alert.alert("Categoria agregada");
  };
  
  const eliminarCategoria = function (e) {
    // let respuesta = array.filter((a) => a !== e);
    // setArray(respuesta);
    // setCategoria("");
    console.log("eliminar categoria")
  };

  return (
    <View style={estilos.container}>
      <Text style={{textAlign: "center",}}>Categorias Actuales</Text>
      <View >
        <FlatList
          data={categoriasApi}
          keyExtractor={(item) => item.id}
          // style={{ borderWidth: 2 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={
                  categoria === item? estilos.listadoActivo : estilos.listado
                }
                onPress={() => setCategoria(item)}
              >
                <Text style={categoria === item? estilos.textBoton : estilos.texto}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>  
      {categoria ? (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={estilos.boton}
            onPress={() => eliminarCategoria(categoria)}
          >
            <Text style = {estilos.textBoton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={estilos.contenedorInput}>
        <TextInput
          style={estilos.inputTexto}
          placeholder="Escriba su nueva categoria aquí..."
          onChangeText={(e) => setText(e)}
          value={text}
        />
      </View>
      {/* <View style={estilos.containerBotones}>
              <TouchableOpacity onPress={() => navigation.navigate("MenuProductos")} style={estilos.boton}><Text style={estilos.textBoton }>Salir</Text></TouchableOpacity>      
              <TouchableOpacity onPress={() => agregarCategoria({name:text})} style={{...estilos.boton, backgroundColor: "green"}}><Text style={estilos.textBoton }>Agregar</Text></TouchableOpacity>
     </View> */}
     <View style={estilos.containerNavBar}>     
              <TouchableOpacity onPress={() => navigation.navigate("MenuProductos")} style={estilos.botonNavBar}><LinearGradient  colors={[ '#ff7f49','#f23c3c', '#d20038']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar}>Salir</Text></LinearGradient></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("MenuPrincipal")}style={estilos.botonNavBar}><LinearGradient  colors={[ '#54b2f5','#9fa5f1', '#dc92cf']} style={{...estilos.botonNavBar,width: '100%'}}><Icon name="home" size={35} color="white" /></LinearGradient></TouchableOpacity>
              <TouchableOpacity onPress={() => agregarCategoria({name:text})}style={estilos.botonNavBar}><LinearGradient  colors={['#3cf23c', '#00dea1']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar }>Agregar</Text></LinearGradient></TouchableOpacity>
            </View>
    </View>
  );
};

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
  container: {
    
    height: "100%",
    display: "flex",
    alignContent: "space-around",
  },
  listado: {
    marginHorizontal: 30,
    margin: 1,
    padding: 3,
    backgroundColor: "#DBD7D7",
    paddingVertical: 10,
    
  },
  listadoActivo: {
    marginHorizontal: 30,
    margin: 1,
    padding: 3,
    backgroundColor: "green",
    paddingVertical: 10,
  },
  texto:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',               
  },
  contenedorInput:{
    position: "absolute",
    bottom: 10,
    width: '100%',
    height: "30%",
  },
  inputTexto: {
    textAlign: "center",
    marginHorizontal: 30,
    fontSize: 18,
    height: "100%",
    backgroundColor: "#DBD7D7",
    borderRadius: 9,
  },
//   containerBotones: {
//     position: "absolute",
//     bottom: 0,
//     marginTop: "25%",
//     width: '100%',
//     height: 90,
//     backgroundColor: '#fff',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
// },
  boton : {
    width: '25%',
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
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    backgroundColor: "red",
  },
  botonEliminar: {
    marginTop: 7,
    backgroundColor: "#EF3E3E",
    padding: 7,
    width: 83,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 4,
  },
  textBoton : {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',               
  } ,
});

