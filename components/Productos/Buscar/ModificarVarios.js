import React, { useState } from "react";
import { Dimensions, StyleSheet,TextInput,TouchableOpacity,View,Text,Modal, SafeAreaView} from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');
const iconSize= 50;


export default function ModificarVarios({estado,listaSeleccionados,setListaSeleccionados,listaCompleta,recargarLista}){
    const [todos,setTodos]=useState(false)
    const [visible,setVisible]=useState(false)
    const [aumentar,setAumentar]=useState(true)
    const [valor,setValor]=useState(0)

    function listaFinal(){
        if(!valor){return}
        if(aumentar){
            return(listaSeleccionados.map(e=>e={...e,price:e.price+(e.price*(valor/100))}))
        }
        if(!aumentar){ 
            return(listaSeleccionados.map(e=>e={...e,price:e.price-(e.price*(valor/100))}))
        }
    }
    function checkTodos(){
        if (!todos){
            setTodos(true)
            setListaSeleccionados(listaCompleta)
        }else{setTodos(false)
            setListaSeleccionados([])}
    }
    function salir(){
        setVisible(false)
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
    function guardar(){
        console.log({products:listaFinal()})
        let productos = {products:listaFinal()}
        putProductos(productos)
        setTimeout(() => {recargarLista()
            setTodos(false)
            setListaSeleccionados([])
           setVisible(false)}, 1000);
    }
    
    return(
        <View style={styles.container}>
             {estado&&
             <LinearGradient 
                colors={[ '#F8E9E9','#B9C7CA']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={styles.buttonTodos}>
                <TouchableOpacity style={styles.buttonTodos} onPress={()=>checkTodos()}>
                    <Text style={estilos.texto}>Todos</Text>
                    {!todos&&<Icons name="checkbox-blank-outline" size={26} color={'#212121'}/>}
                    {!!todos&&<Icons name="checkbox-outline" size={26} color={'green'}/>}
                </TouchableOpacity>
            </LinearGradient>}
            {!!listaSeleccionados.length&&
             <LinearGradient 
                colors={[ '#206593','#25EADE']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={styles.buttonModificar}>
                <TouchableOpacity style={styles.buttonModificar} onPress={()=>setVisible(true)}>
                    <Text style={{...estilos.texto,color:'white'}} >Modificar</Text>
                </TouchableOpacity>
            </LinearGradient>}
            <Modal visible={visible} animationType="slide">
            <LinearGradient 
                colors={[ '#F1F4F4','#DADEDF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
                <SafeAreaView style={{flex:1, width:width, height:height}}>
                    <View style={estilos.cabezaModal}>
                        {/* Opciones aumentar bajar() -------------------------------------*/}
                        <View style={estilos.container2}>               
                            <TouchableOpacity onPress={()=>setAumentar(true)}>
                                <LinearGradient 
                                    colors={!aumentar?[ '#F8E9E9','#B9C7CA']:[ '#206593','#25EADE']}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}><Text style={!!aumentar?{...estilos.texto2, color:'white'}:estilos.texto2}>Aumentar precios</Text>
                                </LinearGradient> 
                            </TouchableOpacity>      
                            
                            <TouchableOpacity onPress={()=>setAumentar(false)}>
                                <LinearGradient 
                                    colors={!!aumentar?[ '#F8E9E9','#B9C7CA']:[ '#206593','#25EADE']}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}><Text style={!aumentar?{...estilos.texto2, color:'white'}:estilos.texto2}>Bajar Precios</Text>
                                </LinearGradient> 
                            </TouchableOpacity>    
                        </View>
                        {/* entrada porcentaje() -------------------------------------*/}
                        <View style={estilos.container2}>
                            <TextInput
                                style={estilos.busqueda}
                                onChangeText={(e) =>setValor(e)}
                                value={valor}
                                placeholder="999999"
                            />
                            <TouchableOpacity>
                            <LinearGradient 
                                    colors={[ '#F8E9E9','#B9C7CA']}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}>
                                    <Text style={estilos.texto2}>%</Text>
                            </LinearGradient>  
                            </TouchableOpacity>
                        </View>
                        {/* button Aplicar() -------------------------------------*/}
                        <TouchableOpacity onPress={()=> listaFinal()} style={styles.botonAplicar}>
                            <LinearGradient 
                                    colors={!valor?[ '#F8E9E9','#B9C7CA']:[ '#206593','#25EADE']}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}>
                                    <Text style={!valor?estilos.texto2:{...estilos.texto2, color:'white'}}>Aplicar</Text>
                            </LinearGradient> 
                        </TouchableOpacity>  
                        {/* button listaFinal() ---------------------------------*/}
                        <TouchableOpacity>
                            <LinearGradient 
                                    colors={!valor?[ '#F8E9E9','#B9C7CA']:[ '#206593','#25EADE']}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}>
                                    <Text style={!valor?estilos.texto2:{...estilos.texto2, color:'white'}}>Ver Lista Final</Text>
                            </LinearGradient> 
                        </TouchableOpacity> 
                        {/* NavBar() -------------------------------------------*/}
                        <View style = {styles.containerNavBar}>   
                            <TouchableOpacity style={styles.buttom} onPress={()=>salir()}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:"#206593",offset:"0",opacity:"1"},
                                        {color:"#25EADE",offset:"1",opacity:"1"},
                                    ]}
                                    name="delete-forever" type="material-community" />  
                                    <Text style={styles.textNavBar}>Salir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("MenuPrincipal")}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:"#206593",offset:"0",opacity:"1"},
                                        {color:"#25EADE",offset:"1",opacity:"1"},
                                    ]}
                                    name="home" type="material-community" />  
                                    <Text style={styles.textNavBar}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttom} onPress={()=>guardar()}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:"#206593",offset:"0",opacity:"1"},
                                        {color:"#25EADE",offset:"1",opacity:"1"},
                                    ]}
                                    name="content-save" type="material-community" />  
                                    <Text style={styles.textNavBar} >Guardar</Text>
                            </TouchableOpacity>
                        </View>                  
                    </View>
                </SafeAreaView>
                </LinearGradient>
           </Modal>
       </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:width*0.9,
        flexDirection:"row",
        justifyContent: 'space-between',
        paddingTop:5,
        paddingBottom:5,
    },
    buttonTodos:{
        flexDirection:"row",
        alignItems:"center",
    },
    buttonModificar:{
        width:width*0.3,
        justifyContent:'center',
        borderRadius:15,
    },
    textNavBar : {
        textAlign: "center",
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',               
    } ,
  
    containerNavBar: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: 70,
         backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    botonOpciones:{
        marginTop:40,
        padding: 10,
        marginBottom: 40,
        alignItems:"center",
        textAlign: 'center',
        borderRadius:15,
    },
    botonAplicar:{
        padding: 10,
        alignItems:"center",
        textAlign: 'center',
    },

})
const estilos = StyleSheet.create({
 
    botonPress:{
        backgroundColor:'aqua',
        flexDirection:"row",
        alignItems:"center",
        paddingBottom:0,
        paddingTop:5,
        paddingHorizontal:0,
        marginTop:10,
    },

    texto:{
        marginTop: 0,
        marginBottom: 0,
        marginRight:20,
        fontSize:14,
        marginLeft:10,
        fontWeight: "bold",
        color:"#212121",
        textAlign:"center",
    },
    cabezaModal:{
        borderBottomColor:'#eee',
        borderBottomWidth:3,
        flexDirection:"column",
        alignItems:"center",
        justifyContent: 'center',
        width:width, height:height,
    },
    busqueda: {
        textAlign: "center",
        width: 200,  
    },
      container: {
        position: "absolute",
        bottom: -80,
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
        elevation: 0,
        flexDirection: 'row',
    },
    container2: {
        width: '100%',
        // backgroundColor: '#fff',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    boton2:{
        marginTop:40,
        padding: 10,
        marginBottom: 40,
        backgroundColor:'#DBD7D7',
        alignItems:"center",
        textAlign: 'center',
    },
    texto2:{
        fontSize:20,
        fontWeight: "bold",
        color:"#212121",
        textAlign:"center",
    },
    botonS : {
        width: '25%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
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
      textBoton : {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',               
      } ,
})