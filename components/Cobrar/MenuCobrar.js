////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import {ActivityIndicator, Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
////////////////////////////////////////////////////
import {getFirestore, collection, Timestamp} from 'firebase/firestore';
import {postFirestore} from '../../functions/apiFunctions'
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
import CardProducto from './Card-Product-In-Cart'

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
        venta?.forEach(producto => value=(value+(producto.amount*producto.price)));
        setTotal(value)
    }
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
    const postSale =(data)=>{
        const selectedCollection = collection(getFirestore(), "users/qDcRzymTV7Op7jTwyZdeu7TxhUM2/sales")
        postFirestore(selectedCollection,data)
    }

    async function registar(venta, productos){
        ///////////////////////actualizar productos stock en la DB//////////////////////////////
        console.log("actualizar productos stock")
        // await putProductos({products:[...productos]})
        ///////////////////////registar venta en la DB//////////////////////////////
        console.log("postear Venta")
        let postVentar =  {
            idClient:"",
            client:"",
            total:total,
            sellProducts:venta,
            createdDate:Timestamp.now().toDate().toString()
        }
        postSale(postVentar)
        navigation.navigate("Ventas")
    }
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    return(
        <LinearGradient 
            colors={colorBackgroundModal}
            start={{x:1,y:0}}
            end={{x:0,y:1}}
            style={{width:width,height:height}}>
           <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("BucarProductos")} style={styles.botonPosition} >
                    <LinearGradient 
                    colors={colorB}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}} 
                    style={styles.boton}><Icons name="plus-box" size={26} color={'white'}/>
                    </LinearGradient>
                </TouchableOpacity>
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
                                categoria={item.category}
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
             <LinearGradient 
                    colors={colorB}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}} style={{height:height*0.04,flexDirection: "row",justifyContent:"space-around",}}>
                <View style={{width: '35%',}}><Text style={styles.text}>Total</Text></View>
                <View style={{width: '35%',}}><Text style={styles.text}>{total}</Text></View>
            </LinearGradient >
            <View style={{height:height*0.36,flexDirection: "row",justifyContent:"space-around",backgroundColor: "green"}}>
               
            </View>
            {/* NavBar() -------------------------------------------*/}
                    <View style = {styles.containerNavBar}>   
                            <TouchableOpacity style={styles.buttom} onPress={() => console.log("Limpiar")}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:iconColorA,offset:"0",opacity:"1"},
                                        {color:iconColorB,offset:"1",opacity:"1"},
                                    ]}
                                    name="delete-forever" type="material-community" />  
                                    <Text style={styles.textNavBar}>Limpiar</Text>
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
                            <TouchableOpacity style={styles.buttom} onPress={()=> registar(venta, shopingCart)}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:iconColorA,offset:"0",opacity:"1"},
                                        {color:iconColorB,offset:"1",opacity:"1"},
                                    ]}
                                    name="content-save" type="material-community" />  
                                    <Text style={styles.textNavBar} >Registrar</Text>
                            </TouchableOpacity>
                    </View> 
               </View>  
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop:25,
        flex:1,
        width:width, height:height,
        alignItems:"center",
      },
    contenedorBtonones: {
        width:"100%",
        flexDirection: "row",
        justifyContent: "space-around",  
    },
    botonPosition:{
        zIndex:1,
        position: "absolute",
        bottom: height*0.30,
        right: width*0.1,
        width: width*0.15,
        height: height*0.07,
    },
    boton:{
        width: width*0.15,
        height: height*0.07,
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
        color: 'white',   
        textAlign:"center",            
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


})
