import React , {useEffect, useState} from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
const CardProducto = (
  {id,nombre, categoria, precio,product,shopingCart,shopingCartSave,setShopingCart,venta,setVenta})=>{
  const navigation = useNavigation();
  const [cantidad,setCantidad]= useState(1)
    function existe(arrayDeObjetos,atributo,valor){
      for(let i=0;i<arrayDeObjetos.length;i++){
        if(arrayDeObjetos[i][atributo]===valor){
          return true
        }
      }
      return false
    }

  ///////////////////////////////////////////////////////////////
  function addd(ventaEdit){
    let productoSave = shopingCartSave.filter(i=>i.id===id)
    let productoCantidad = ventaEdit.filter(i=>i.id===id)
    let productos = shopingCart
    for(let i=0;i<productos.length;i++){
        if(productos[i].id===id){
            productos[i]={...productos[i],stock:productoSave[0].stock-productoCantidad[0].ammount}
        }
    }
    setShopingCart(productos)  
  }  
  function removee(Producto){
    setShopingCart(shopingCart.filter(p=>p.id!=Producto.id))     
  }
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if(!existe(venta,"id",id)&&cantidad>0){
      setVenta([...venta,{id:id,name:nombre,ammount:cantidad,price:precio}])
      let productoSave = shopingCart.filter(i=>i.id===id)
      setShopingCart([...shopingCart.filter(i=>i.id!=id),{...productoSave[0],stock:productoSave[0].stock-cantidad}])
    }else{
      if(cantidad===0){
        let ventaEdit=venta.filter(i=>i.id!=id)
        setVenta(ventaEdit)
        removee(product)
      }
      else{
        let ventaEdit = [...venta]
        for(let i=0;i<ventaEdit.length;i++){
          if(ventaEdit[i].id===id){
            ventaEdit[i]={...ventaEdit[i],ammount:cantidad}
          }
        }
        setVenta(ventaEdit)
        addd(ventaEdit)
      }
    }
  },[cantidad])
    function add(){
      setCantidad(cantidad+1)
    }
    function remove(){
      setCantidad(cantidad-1)
    }
    return (
      <>
        <View
          style={estilo.lista}>
          <Text style={estilo.texto1}>{nombre}</Text>
          <Text style={estilo.texto2}>{categoria}</Text>
          <Text style={estilo.texto3}>{precio} </Text>
        </View>
        <View style={estilo.listaCart}> 
          <TouchableOpacity onPress={()=>remove()}><Icon name="cart-remove" size={26} color={'white'}/></TouchableOpacity>
            <Text style={{color:'white'}}>Cantidad: {cantidad}</Text>
          <TouchableOpacity onPress={()=>add()}><Icon name="cart-plus" size={26} color={'white'}/></TouchableOpacity>
        </View>
      </>
    );
  


};

let estilo = StyleSheet.create({
  listaCart: {
    flex: 1,
    backgroundColor: "green",
    marginTop:0,
    marginBottom:5,
    elevation: 1,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    padding: 10,
    justifyContent:"space-around",
},
  lista: {
    flex: 1,
    backgroundColor: "#F8E9E9",
    margin: 5,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent:"space-between",
  },
  texto1: { color: "black", width: "30%" },
  texto2: { color: "black", textAlign: "center", width: "30%" },
  texto3: { color: "black", textAlign: "right", width: "30%" },
});

export default CardProducto;
