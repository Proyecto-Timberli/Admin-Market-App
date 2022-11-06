import React, { useEffect, useState } from "react";
import { ActivityIndicator,Dimensions,FlatList,StyleSheet,TextInput,TouchableOpacity,View,Text} from "react-native";
import CardProducto from "./Card-Producto";
import axios from 'axios'
import CategoriesSelect from './Buscar/FIltro Categorias/FiltroCategorias'
import ModificarVarios from './Buscar/ModificarVarios'
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');

const Loading =()=>{
  return (
    <View style={[styles.Loading]}>
      <ActivityIndicator size="large" />
    </View>
  )
}
const Productos = ({navigation}) => {
  const baseUrl = "https://admin-market-api.herokuapp.com" ;
  const [productosApi,setProductosApi]= useState(null)
  const peticionProductos=()=>{
      axios.get(baseUrl+"/api/product"
      )
      .then(function (response) {
          setProductosApi(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
  }
  useEffect(() => {
      peticionProductos()
  },[]);
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  let arrayAMostrar = productosApi;
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //Funcion Filtro catgorias
  const [filtroCategoria,setFiltroCategoria]= useState(null)
  function filtroCategory(category) {
    if (!productosApi){return} 
    if (!category){return setFiltroCategoria(null)}
    return (
      setFiltroCategoria(productosApi.filter((e) =>e.categories[0] && e.categories[0].includes(category))),
      console.log("filtrado......................."),
      console.log(productosApi.filter((e) =>e.categories[0] && e.categories[0].includes(category))),
      // console.log(productosApi),
      console.log("filtrado.......................")
    )
  }
  if (filtroCategoria){
    arrayAMostrar=filtroCategoria
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //Funcion Busqueda Nombre
  function filtroName(array, search, attibute) {
    if (!array){return} 
    return array.filter(
      (e) =>
        e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase())
    );
  }
  const [filterBySearch, setFilterBySearch] = useState("");
  let filtro = filtroName(arrayAMostrar, filterBySearch, "name");
  const filtroBusqueda = function (e) {
    setFilterBySearch(e);
  };
  if (filterBySearch !== "") {
    arrayAMostrar = filtro;
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  // configuracion ModificarVarios
  const [seleccionarVarios,setSeleccionarVarios] = useState(false);
  const [arraySeleccionados,setArraySeleccionados]= useState([]);
  useEffect(() => {
    if(!arraySeleccionados.length){
      setSeleccionarVarios(false)
    }
  },[arraySeleccionados]);
  /////////////////////////////////////////////////////
  const [IdSelect, setIdSelect] = useState(0);
  const onLongPressHandler=(params)=>{
    if(!seleccionarVarios){
      setSeleccionarVarios(true)
    }
    if(arraySeleccionados.includes(params)){
      setArraySeleccionados(arraySeleccionados.filter(select=>select!==params))
    }
    else{
      setArraySeleccionados([...arraySeleccionados,params])
    }
  }
  const onPressHandler=(params)=>{
    if(!seleccionarVarios){
      setIdSelect(params.id)
      navigation.navigate("Producto-info",{...params})
    }
    else{
      if(arraySeleccionados.includes(params)){
        setArraySeleccionados(arraySeleccionados.filter(select=>select!==params))
      }
      else{
        setArraySeleccionados([...arraySeleccionados,params])
      }
    }
  }
  
  /////////////////////////////////////////////////////
  
    return (
      <LinearGradient 
                colors={[ '#F1F4F4','#DADEDF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
        <View style={styles.container}>
          <View style={styles.caja}>
            <TextInput
            style={styles.textInput}
            onChangeText={(e) => filtroBusqueda(e)}
            value={filterBySearch}
            placeholder="Buscar..."
            />
            <CategoriesSelect filtrar={filtroCategory}/>
            <ModificarVarios estado={seleccionarVarios} listaSeleccionados={arraySeleccionados} setListaSeleccionados={setArraySeleccionados} listaCompleta={arrayAMostrar} recargarLista={peticionProductos} navigation={navigation}/>
          </View>
          {!productosApi?<Loading/>:
          <FlatList
            data={arrayAMostrar}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onLongPress={()=> onLongPressHandler(item)}
                  onPress={() => onPressHandler(item)}>
                  <CardProducto
                    key={item.id}
                    id={item.id}
                    nombre={item.name}
                    categoria={item.categories[0]}
                    precio={item.price}
                    listaSeleccionados={arraySeleccionados}
                  />
                </TouchableOpacity>
              );
            }}
          />
        }
        </View>
      </LinearGradient>
    );
  
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
  },
  caja:{
    width:width,
    paddingTop:30,
    alignItems:"center",
  },
  textInput:{
    padding: 10,
    paddingStart:30,
    width:width*0.5,
    height:50,
    marginTop:20,
    borderRadius:30,
    backgroundColor:"#fff",
  },
  Loading: {
    flex: 1,
    justifyContent: "center"
  },
})


export default Productos;
