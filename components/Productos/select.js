import React, {useState } from "react";
import { FlatList,StyleSheet,TextInput,TouchableOpacity,View,Text,Modal, SafeAreaView} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

 /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  const Touchable = (text='Select a option',onPress)=>{
    const TouchableComponent = ()=>{
      return (
        <TouchableOpacity 
          onPress={onPress}
          style={estilos.selectTouch}>
          <Text style={estilos.selectText}>{text}</Text>
          <Icon name="chevron-right" color="#555" size={26}/>
        </TouchableOpacity>
      )
    }
    return {TouchableComponent}
  }
  const Option =(item, value , selected ,objKey,onPress) =>{
    const OptionComponent =()=>{
      return (
        <TouchableOpacity style={estilos.selctedContainer} onPress={onPress}>
          <Text style={estilos.selectText}>{item?.[value]}</Text>
          {selected?.[objKey]=== item?.[objKey] ? (<Icon name="check" color="green" size={18}/>):null}
          
        </TouchableOpacity>
      )
    }
    return {OptionComponent}
  }
  export default function Select (
    { 
        touchableComponent = Touchable,
        optionComponent=Option,
        touchableText = 'Select a option',  
        title ="",
        data=[],
        objKey ='id',
        objValue="name"
    }) {
    
    const [visible,setVisible] = useState(false)
    const {TouchableComponent}=touchableComponent(touchableText,()=> setVisible(true));
    const [selected,setSelected] = useState(null)
    function renderOption(item){
      const {OptionComponent}=optionComponent(item,objValue,selected, objKey, ()=>toggleSelect(item))
      return <OptionComponent/>
    }
    function toggleSelect(item){
      if(item?.[objKey] === selected?.[objKey]){
        setSelected(null)
      }else{
        setSelected(item)
      }
    }
    return(
      <View>
       <TouchableComponent/>  
       <Modal visible={visible} animationType="slide">
         <SafeAreaView style={{flex:1}}>
           <View style={estilos.cabeza}>
             <TouchableOpacity onPress={()=> setVisible(false)}>
             <Icon name="close" size={26} color={'#212121'}/>
             </TouchableOpacity>
             <View style={estilos.tituloContenedor}>
               <Text style={estilos.titulo}>{title}</Text>
             </View>
           </View>
          
           <FlatList  
            data={data}
            keyExtractor={(_,index) => String(index)}
            renderItem={({ item }) => renderOption(item)}
          />
         </SafeAreaView>
       </Modal>
      </View>
    )
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  const estilos = StyleSheet.create({
    lista: { flex: 1, alignItems: "center", marginTop: 40 },
    caja: {
      zIndex: 7,
      elevation: 7,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
    },
    busqueda: {
      padding: 10,
      textAlign: "center",
      borderRadius: 5,
      width: 200,
      zIndex: 8,
      elevation: 8,
      borderWidth: 1,
      backgroundColor: "white",
    },
    selectTouch:{
      flexDirection:'row',
      alignItens: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical:12,
      borderBottomColor:'#eee',
      borderBottomWidth:1,
    },
    selectText:{
      marginLeft:50,
      color:'#212121',
      fontSize:14,
      fontWeight:'600', 
    },
    cabeza:{
      borderBottomColor:'#eee',
      borderBottomWidth:3,
      flexDirection:"row-reverse",
      alignItems:"center",
      paddingBottom:12,
      paddingHorizontal:12,},
    tituloContenedor:{
      flex:1,
    },
    titulo:{
      fontSize:18,
      marginLeft:-38,
      fontWeight: "bold",
      color:"#212121",
      textAlign:"center",
    },
    selctedContainer:{
      flexDirection:'row',
      alignItens: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical:12,
      borderBottomColor:'#eee',
      borderBottomWidth:1,
    },
    
  });
  