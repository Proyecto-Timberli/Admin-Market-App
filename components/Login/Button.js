import React from "react";
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function ButtonGradient(){
   
    return (    
        <TouchableOpacity style={styles.container} >
          <LinearGradient 
            colors={[ '#206593','#25EADE']}
            start={{x:1,y:0}}
            end={{x:0,y:1}}
            style={styles.button}>
            <Text style={styles.text}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity> 
    )
}
export default ButtonGradient

const styles= StyleSheet.create({
    container: {
        width: '80%',
        height:50,
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        width:"80%",
        height:50,
        borderRadius:25,
        padding:10,
    },
    text:{
        fontSize:20,
        color:"#fff",
        textAlign:"center",
    }

})