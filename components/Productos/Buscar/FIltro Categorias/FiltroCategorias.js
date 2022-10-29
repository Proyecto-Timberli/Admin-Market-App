import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Text} from "react-native";
import axios from 'axios'
import Select from './Select'
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');
export default function CategoriesSelect({filtrar}){
/////////////////////////////////////////////////
/////////////////////////////////////////////////
  const baseUrl = "https://admin-market-api.herokuapp.com" ;
  const [categoriasApi,setCategoriasApi]= useState(null)
  const peticionProductos=()=>{
      axios.get(baseUrl+"/api/category"
      )
      .then(function (response) {
        setCategoriasApi(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
      peticionProductos()
  },[]);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
    return(
        <>
        <View style={styles.container}>
          <Text style={styles.title}>Filtrar por Categorias</Text>
          <Select touchableText = "Selecciona una Categoria" title="Categorias" objKey='id' objValue= "name" data={categoriasApi} filtrar={filtrar}/>
        </View>
      </>
    )
}
const styles = StyleSheet.create({
  container: {
    width:width*0.9,
    backgroundColor:'white',
    flexDirection:"row",
    alignItems:"center",
    marginTop:10,
  },
  title:{
    marginLeft:5,
    fontSize:14,
    fontWeight: "600",
    color:"#212121",
  },
})

