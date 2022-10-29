import React,{ useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {View,Text,TextInput,FlatList,TouchableOpacity,StyleSheet,Modal,SafeAreaView } from 'react-native';
import CardVenta from './CardVenta'
import axios from 'axios'
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
        <View style={{flex: 1}}>
            <View style={estilos.caja}>
                <TextInput
                    style={estilos.busqueda}
                    onChangeText={(e) => filtroBusqueda(e)}
                    value={filterBySearch}
                    placeholder="Buscar..."
                />                       
            </View>
            <View style={estilos.lista}>
                <Text style={estilos.texto1}>Nro Venta</Text>
                <Text style={estilos.texto2}>Total</Text>
                <Text style={estilos.texto3}>Fecha </Text>
            </View>
            <View style={{height:600}}>
                <FlatList
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
                />
            </View>
            <View style={estilos.containerNavBar}>     
                  <TouchableOpacity onPress={() => console.log("ss")} style={estilos.botonNavBar}><LinearGradient  colors={[ '#ff7f49','#f23c3c', '#d20038']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar}>Anular</Text></LinearGradient></TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("MenuPrincipal")}style={estilos.botonNavBar}><LinearGradient  colors={[ '#54b2f5','#9fa5f1', '#dc92cf']} style={{...estilos.botonNavBar,width: '100%'}}><Icon name="home" size={35} color="white" /></LinearGradient></TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("comprobante")}style={estilos.botonNavBar}><LinearGradient  colors={['#3cf23c', '#00dea1']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar }>Resumen</Text></LinearGradient></TouchableOpacity>
            </View>
           
        </View>   
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
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',   
        textAlign:"center",            
    },
    lista: {
        flex: 1,
        backgroundColor: "white",
        margin: 5,
        elevation: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        justifyContent:"space-between",
        height: 50,
      },
    texto1: { color: "black", width: "30%" },
    texto2: { color: "black", textAlign: "center", width: "30%" },
    texto3: { color: "black", textAlign: "right", width: "30%" },
    caja: {
        margin:10,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    busqueda: {
        textAlign: "center",
        borderRadius: 5,
        width: 200,
        borderWidth: 1,
        backgroundColor: "white",
    },

})
