import React,{ useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {View,Text,TextInput,FlatList,TouchableOpacity,StyleSheet,Modal,SafeAreaView } from 'react-native';

export default function NavBar(boton1,boton2){

    return(
        <View style={estilos.containerNavBar}>     
            <TouchableOpacity onPress={() => console.log("ss")} style={estilos.botonNavBar}><LinearGradient  colors={[ '#ff7f49','#f23c3c', '#d20038']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar}>Anular</Text></LinearGradient></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MenuPrincipal")}style={estilos.botonNavBar}><LinearGradient  colors={[ '#54b2f5','#9fa5f1', '#dc92cf']} style={{...estilos.botonNavBar,width: '100%'}}><Icon name="home" size={35} color="white" /></LinearGradient></TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("comprobante")}style={estilos.botonNavBar}><LinearGradient  colors={['#3cf23c', '#00dea1']} style={{...estilos.botonNavBar,width: '100%'}}><Text style={estilos.textNavBar }>Resumen</Text></LinearGradient></TouchableOpacity>
        </View>
    )
}
