import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Text} from "react-native";
import Select from './Select'
import {useAuth} from '../../../../context/authContext'
import {getFirestore, collection, getDocs, doc} from 'firebase/firestore';
const {width, height} = Dimensions.get('window');
export default function CategoriesSelect({filtrar}){
  const {userProfile} = useAuth()
/////////////////////////////////////////////////
/////////////////////////////////////////////////
  const [categoriesApi,setCategoriesApi]= useState(null)
  const getCategories =  ()=>{
    const selectedC = collection(getFirestore(), "users/"+userProfile+"/categories")
      getDocs(selectedC)
      .then(res => setCategoriesApi(res.docs.map(category=>({id:category.id,...category.data()}))))
  }
 
  useEffect(() => {
      getCategories()
  },[]);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
    return(
        <>
        <View style={styles.container}>
          <Text style={styles.title}>Filtrar por Categorias</Text>
          <Select touchableText = "Selecciona una Categoria" title="Categorias" objKey='id' objValue= "name" data={categoriesApi} filtrar={filtrar}/>
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

