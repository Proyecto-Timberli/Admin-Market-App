import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View,Button,Text,TextInput,FlatList,TouchableOpacity,StyleSheet,Modal,SafeAreaView } from 'react-native';
import CardProducto from './Card-Producto-Cobrar'
import CategoriesSelect from './../Productos/Buscar/FIltro Categorias/FiltroCategorias'

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
        <View style={estilos.lista}>      
            <View style={estilos.caja}>
                <TextInput
                    style={estilos.busqueda}
                    onChangeText={(e) => filtroBusqueda(e)}
                    value={filterBySearch}
                    placeholder="Buscar..."
                />
                <CategoriesSelect filtrar={filtroCategory}/>
                        
            </View>
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
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>                               
    );
}
const estilos = StyleSheet.create({
    boton:{
        marginLeft:'10%',
        width: '40%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        backgroundColor: "aqua",
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',               
    },
    lista: { flex: 1, alignItems: "center", marginTop: 40 },
    caja: {
        elevation: 7,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
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
})
