import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-gradient-icon';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {AuthProvider, } from '../context/authContext'
//-----------------------Productos------------------------------------
import MenuProductos from "./Productos/MenuProductos";
import Productos from './Productos/Productos'
import InformacionProducto from './Productos/Informacion-Editar'
import AgregarUno from './Productos/Agregar-Uno'
import Categorias from './Productos/Nueva-Categoria'
//-----------------------cobrar------------------------------------
import MenuCobrar from "./Cobrar/MenuCobrar";
import BucarProductos from './Cobrar/BuscarProductos'
import Ventas from './Cobrar/Ventas'
import VentaResumen from './Cobrar/VentaResumen'
//-----------------------cuenta------------------------------------
import MenuCuenta from "./Cuenta/MenuCuenta";
// Components
import Register from "./Login/Register";
import Login from "./Login/Login";
import Cuenta from "./Cuenta/firestore"
import Customers from './Clientes/Customers'
import InformationClient from './Clientes/Client-Edit-Info'
import AddClient from './Clientes/Add-Client'
import Providers from './Provedores/Providers'
import AddProvider from './Provedores/Add-Provider'
import InformationProvider from './Provedores/Provider-Edit-Info'

const {width, height} = Dimensions.get('window');
const Stack = createNativeStackNavigator();
const iconSize= 100;
function MenuPrincipal(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("MenuProductos")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="storefront" type="material-community" />  
                    <Text style={styles.text}>Productos</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("MenuCobrar")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="cash-register" type="material-community" />  
                    <Text style={styles.text}>Cobrar</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("Ventas")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="format-list-bulleted-square" type="material-community" />  
                    <Text style={styles.text}>Ventas</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("Customers")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="account-group" type="material-community" />  
                    <Text style={styles.text}>Clientes</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("Providers")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="account-group" type="material-community" />  
                    <Text style={styles.text}>Provedores</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("Cuenta")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="account" type="material-community" />  
                    <Text style={styles.text}>Cuenta</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    );

}
export default function MenuMain(){
    
    return( 
        <NavigationContainer>  
            <AuthProvider>
            {/* <Stack.Navigator initialRouteName="MenuPrincipal" */}
            <Stack.Navigator initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}>
               <Stack.Screen name="MenuPrincipal" component={MenuPrincipal}/>
                <Stack.Screen name="Cuenta" component={Cuenta}/>
                <Stack.Screen name="MenuProductos" component={MenuProductos}/>
                <Stack.Screen name="MenuCobrar" component={MenuCobrar}/>
                {/* //-----------------------MenuProductos------------------------------------ */}
                <Stack.Screen name="Productos" component={Productos}/>
                <Stack.Screen name="Producto-info" component={InformacionProducto}/>
                <Stack.Screen name="AgregarUno" component={AgregarUno}/>
                <Stack.Screen name="Categorias" component={Categorias}/>        
                {/* //-----------------------MenuCobrar------------------------------------ */}
                <Stack.Screen name="BucarProductos" component={BucarProductos}/>
                <Stack.Screen name="Ventas" component={Ventas}/>
                <Stack.Screen name="VentaResumen" component={VentaResumen}/>
                {/* //-----------------------Cuenta------------------------------------ */}
                <Stack.Screen name="Login" component={Login}/> 
                <Stack.Screen
                name="Register"
                component={Register}
                />
                <Stack.Screen
                name="Customers"
                component={Customers}
                />
                <Stack.Screen
                name="Client-info"
                component={InformationClient}
                />
                <Stack.Screen
                name="Add-client"
                component={AddClient}
                />
                <Stack.Screen
                name="Providers"
                component={Providers}
                />
                <Stack.Screen
                name="Add-providers"
                component={AddProvider}
                />
                <Stack.Screen
                name="Provider-info"
                component={InformationProvider}
                />
            </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    container:{
        width:width,
        flex:1,  
        flexWrap:'wrap',
    },
    buttom:{
      width: width/4,
      height: height/6,
    },
    buttonContainer:{
        width: width/2,
        height: height/3,
        alignItems:"center",
        justifyContent: "center",
    },   
    text:{
        width:"100%",
        textAlign: "center",
    },
})
