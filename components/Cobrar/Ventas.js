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
import CardVenta from './CardVenta'
const Loading =()=>{
    return (
      <View style={[styles.Loading]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
export default function Ventas({route,navigation}){
    const [ventas,setVentas]=useState(null)
    const baseUrl = "https://admin-market-api.herokuapp.com" ;
    const  getVentas= ()=>{
        axios.get(baseUrl+"/api/venta"
        )
        .then(function (response) {
            setVentas(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // const getVentas =  ()=>{
    //   const selectedC = collection(getFirestore(), "users/qDcRzymTV7Op7jTwyZdeu7TxhUM2/sales")
    //     getDocs(selectedC)
    //     .then(res => setProvidersApi(res.docs.map(sale=>({id:sale.id,...sale.data()}))))
    // }
    useEffect(() => {
        getVentas()
    },[])
    let dataRender = ventas
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    
    function filtroName(array, search, attibute) {
        if (!array){return} 
        return array.filter(
        (e) =>e[attibute].toString() && e[attibute].toString()===(search)
        );
    }
    const [filterBySearch, setFilterBySearch] = useState("");
    let filtro = filtroName(ventas, filterBySearch, "id");
    const filtroBusqueda = function (e) {
        setFilterBySearch(e);
    };
    if (filterBySearch !== "") {
        dataRender=filtro
    }
   /////////////////////////////////////////////////////
   /////////////////////////////////////////////////////
    return(
         <LinearGradient 
            colors={colorBackgroundModal}
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
            </View>
            <View style={styles.lista}>
                <Text style={styles.text}>Nro Venta</Text>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>Fecha </Text>
            </View>
            <View style={{height:height*0.72,}}>
            {!ventas?<Loading/>:<FlatList
                    data={dataRender}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("VentaResumen",{id:item.id,total:item.total,fecha:item.createdAt,resumen:item.resumen})}>   
                                <CardVenta
                                    key={item.id+"p"}
                                    id={item.id}
                                    total={item.total}
                                    fecha={item.createdAt}
                                    resumen={item.resumen}
                                />
                            </TouchableOpacity> 
                        );
                    }}
                />}
            </View>
            {/* NavBar() -------------------------------------------*/}
            <View style = {styles.containerNavBar}>   
                        <TouchableOpacity style={styles.buttom} onPress={() => console.log("Anular")}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:iconColorA,offset:"0",opacity:"1"},
                                        {color:iconColorB,offset:"1",opacity:"1"},
                                    ]}
                                    name="delete-forever" type="material-community" />  
                                    <Text style={styles.textNavBar}>Anular</Text>
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
                        <TouchableOpacity style={styles.buttom} onPress={() => console.log("comprobante")}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:iconColorA,offset:"0",opacity:"1"},
                                        {color:iconColorB,offset:"1",opacity:"1"},
                                    ]}
                                    name="content-save" type="material-community" />  
                                    <Text style={styles.textNavBar} >Resumen</Text>
                        </TouchableOpacity>
                </View> 
        </View>   
        </LinearGradient>
    )

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
      marginBottom:5,
      borderRadius:30,
      backgroundColor:"#fff",
    },
    lista: {
        width:width*0.88,
        height: height*0.04,
        margin: 5,
        backgroundColor: "white",
        justifyContent:"space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    text: { color: "black"},
    Loading: {
      flex: 1,
      justifyContent: "center"
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
