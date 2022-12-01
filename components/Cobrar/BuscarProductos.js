////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import {ActivityIndicator, Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
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
import CardProducto from './Card-Producto-Cobrar'
import CategoriesSelect from './../Productos/Buscar/FIltro Categorias/FiltroCategorias'
const Loading =()=>{
    return (
      <View style={[styles.Loading]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
export default function BucarProductos({ route, navigation }){
    ///////////////////////////////////////////////////// 
    /////////////////////////////////////////////////////
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
    let arrayAMostrar = productosApi;
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
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
  
   //Reflejar Stock
   function addToCart(product){
    // Pass and merge params back to home screen
    navigation.navigate({
      name: 'MenuCobrar',
      params: { products: product},
      merge: true,
    });}
   /////////////////////////////////////////////////////
   /////////////////////////////////////////////////////
    return(
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
          </View>
          {!productosApi?<Loading/>:
            <FlatList
                data={arrayAMostrar}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        // <TouchableOpacity
                        //     onPress={() => handlerStateFunction(item)}>
                            <CardProducto
                                key={item.id}
                                id={item.id}
                                nombre={item.name}
                                categoria={item.categories[0]}
                                precio={item.price}
                                product={item}
                                onPress={addToCart}
                            />
                        // </TouchableOpacity>
                    );
                }}
            />}
        </View>  
        </LinearGradient>                             
    );
}
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
