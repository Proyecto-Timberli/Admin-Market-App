import React, { useEffect, useState } from "react";
import { Dimensions,FlatList,StyleSheet,TextInput,TouchableOpacity,View} from "react-native";
import CardProducto from "./Card-Producto";
import InformacionProducto from './Informacion-Editar'
import axios from 'axios'
import CategoriesSelect from './Buscar/FIltro Categorias/FiltroCategorias'
import ModificarVarios from './Buscar/ModificarVarios'
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');
const Productos = () => {
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
  const [Info, setInfo] = useState(false);
  const [IdSelect, setIdSelect] = useState(0);

  const onLongPressHandler=(param)=>{
    if(!seleccionarVarios){
      setSeleccionarVarios(true)
    }
    if(arraySeleccionados.includes(param)){
      setArraySeleccionados(arraySeleccionados.filter(select=>select!==param))
    }
    else{
      setArraySeleccionados([...arraySeleccionados,param])
    }
  }
  const onPressHandler=(param)=>{
    if(!seleccionarVarios){
      setIdSelect(param.id)
      setInfo(true)
    }
    else{
      if(arraySeleccionados.includes(param)){
        setArraySeleccionados(arraySeleccionados.filter(select=>select!==param))
      }
      else{
        setArraySeleccionados([...arraySeleccionados,param])
      }
    }
  }
  let productoInfo =()=>{ if(productosApi){return productosApi.filter(product=> product.id === IdSelect)}}
  /////////////////////////////////////////////////////
  if (!Info){
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
          <ModificarVarios estado={seleccionarVarios} listaSeleccionados={arraySeleccionados} setListaSeleccionados={setArraySeleccionados} listaCompleta={arrayAMostrar} recargarLista={peticionProductos}/>
        </View>
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
      </View>
      </LinearGradient>
    );
  }else{
    return (
      <View>
            <InformacionProducto
              id={productoInfo()[0].id}
              nombre={productoInfo()[0].name}
              precio={productoInfo()[0].price}
              stock ={productoInfo()[0].stock}
              categoria={productoInfo()[0].categories}
              marca={productoInfo()[0].make}
              // precioAnterior : productoInfo[0].precioAnterior,
              precioCompra={productoInfo()[0].buyprice}
              // codigo : productoInfo[0].codigo,
              informacionProducto={productoInfo()[0].description}
              imagen={productoInfo()[0].image}
              setInfo={setInfo}
            />
      </View>
    )
  }
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
})


export default Productos;
