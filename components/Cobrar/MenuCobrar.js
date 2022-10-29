import React,{ useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {View,Text,TextInput,FlatList,TouchableOpacity,StyleSheet,Modal,SafeAreaView } from 'react-native';
import CardProducto from './Card-Product-In-Cart'
import axios from 'axios'
export default function MenuCobrar({route,navigation}){
    /////////////////////////////////////////////////////
    function existe(arrayDeObjetos,atributo,valor){
        for(let i=0;i<arrayDeObjetos.length;i++){
          if(arrayDeObjetos[i][atributo]===valor){
            return true
          }
        }
        return false
    }
    /////////////////////////////////////////////////////
    const[shopingCart,setShopingCart]=useState([]);
    const[shopingCartSave,setShopingCartSave]=useState([]);
    const[total,setTotal]=useState(0.00);
    const [venta,setVenta]= useState([])
    /////////////////////////////////////////////////////
    useEffect(() => {
        if (route.params?.products) {
            if(!existe(shopingCart,"id",route.params?.products.id)){
                setShopingCart([...shopingCart,route.params.products])
                setShopingCartSave([...shopingCartSave,route.params.products])
            }
        }
    }, [route.params?.products]);
   
    /////////////////////////////////////////////////////
    //////////////////////////registar///////////////////
    /////////////////////////////////////////////////////
    useEffect(() => {
        sumaProductos()
    },[venta])
    function sumaProductos(){
        let value = 0
        venta?.forEach(producto => value=(value+(producto.ammount*producto.price)));
        setTotal(value)
    }
    const baseUrl = "https://admin-market-api.herokuapp.com" ;
    const  putProductos= (productos)=>{
        axios.put(baseUrl+"/api/product",productos
        )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const  postVenta= (venta)=>{
        axios.post(baseUrl+"/api/venta",venta
        )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    async function registar(venta, productos){
        ///////////////////////actualizar productos stock en la DB//////////////////////////////
        console.log("actualizar productos stock")
        await putProductos({products:[...productos]})
        ///////////////////////registar venta en la DB//////////////////////////////
        console.log("postear Venta")
        let postVentar =  {
            total:total,
            resumen:{resumen:venta}
        }
        await postVenta(postVentar)
        navigation.navigate("Ventas")
    }
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    return(
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => navigation.navigate("BucarProductos")} style={estilos.boton}><Icon name="plus-box" size={26} color={'white'}/></TouchableOpacity>
           <FlatList
                data={shopingCart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View>    
                            <CardProducto
                                key={item.id+"p"}
                                id={item.id}
                                nombre={item.name}
                                categoria={item.categories[0]}
                                precio={item.price}
                                product={item} 
                                shopingCart={shopingCart}
                                shopingCartSave={shopingCartSave}
                                setShopingCart={setShopingCart} 
                                venta={venta}
                                setVenta={setVenta}
                            />
                            {}
                        </View>   
                    );
                }}
            />
             <View style={{height:30,flexDirection: "row",justifyContent:"space-around",}}>
                <View style={{width: '35%',}}><Text style={estilos.text}>Total</Text></View>
                <View style={{width: '35%',}}><Text style={estilos.text}>{total}</Text></View>
            </View>
            <View style={{height:270,flexDirection: "row",justifyContent:"space-around",backgroundColor: "green"}}>
               
            </View>
            {/* <View style={estilos.containerBotones}>
              <TouchableOpacity onPress={() => console.log("s")} style={estilos.boton2}><Text style={estilos.textBoton2 }>Limpiar</Text></TouchableOpacity>      
              <TouchableOpacity onPress={()=> registar(venta, shopingCart)} style={estilos.boton2}><Text style={estilos.textBoton2 }>Registrar</Text></TouchableOpacity>
            </View> */}
            <View style={estilos.containerNavBar}>     
                <TouchableOpacity onPress={() => console.log("s")} style={estilos.botonNavBar}><LinearGradient  colors={[ '#ff7f49','#f23c3c', '#d20038']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar}>Limpiar</Text></LinearGradient></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("MenuPrincipal")}style={estilos.botonNavBar}><LinearGradient  colors={[ '#54b2f5','#9fa5f1', '#dc92cf']} style={{...estilos.botonNavBar,width: '100%'}}><Icon name="home" size={35} color="white" /></LinearGradient></TouchableOpacity>
                <TouchableOpacity onPress={()=> registar(venta, shopingCart)}style={estilos.botonNavBar}><LinearGradient  colors={['#3cf23c', '#00dea1']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar }>Registrar</Text></LinearGradient></TouchableOpacity>
            </View>
        </View>
    );
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
    // textBoton2 : {
    //     textAlign: "center",
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: '#fff',               
    // } ,
    // boton2 : {
    //     width: '25%',
    //     height: 50,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 10,
    //     marginVertical: 10,
    //     marginHorizontal: 20,
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 12,
    //     },  shadowOpacity: 0.58,
    //     shadowRadius: 16.00,
    //     elevation: 24,
    //     backgroundColor: "green",
    // },
    // containerBotones: {
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
    contenedorBtonones: {
        width:"100%",
        flexDirection: "row",
        justifyContent: "space-around",  
    },
    boton:{
        position: "absolute",
        zIndex:1,
        width: '15%',
        height: 45,
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
        right: 76,
        bottom: "39%",
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',   
        textAlign:"center",            
    },


})
