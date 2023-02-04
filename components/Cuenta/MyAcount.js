import {useEffect} from 'react'
import {useAuth} from '../../context/authContext'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-gradient-icon';
import QrGenerator from '../../functions/QrGenerator'
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
  };
const {width, height} = Dimensions.get('window');
const iconSize= 100;

const MyAcount=({navigation})=>{
    console.log("------------------------")
    console.log("MyAcount")
    const {user, logout, loading} = useAuth()
    const handleLogout = async ()=>{
        await logout()
        navigation.navigate("Login")
    }
    /////////Protected Screen
    useEffect(() => {
        if(loading){
            return (
              <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color:"black"}}>Cargando...</Text>
              </View>
            )
        }
        if (!user){
            return navigation.navigate("Login")
        }
    },[])
    /////////Protected Screen
    console.log("------------------------")
    return(
        <View style={styles.container}>
            <View style={{...styles.buttonContainer,width:width}}>
                <TouchableOpacity style={{ 
                    width: width/4,
                }}>
                    <Icon  
                        size={iconSize}
                        colors={[
                            {color:"#206593",offset:"0",opacity:"1"},
                            {color:"#25EADE",offset:"1",opacity:"1"},
                        ]}
                        name="account-box" type="material-community" />  
                </TouchableOpacity>
                <Text style={styles.text}>{user.email}</Text>
            </View>
            <View style={styles.container2}>
                <View style={styles.buttonContainer}>
                    <Text style={{...styles.text,marginBottom:10}}>Codigo de Usuario:</Text>
                    <Text 
                        style={{...styles.text,width:"80%",marginBottom:15}}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >{user.uid}</Text>
                    <View style={{
                        width: width/2,
                        flexDirection:"row",
                        justifyContent:"space-around"}}>
                        <TouchableOpacity onPress ={()=>{copyToClipboard(user.uid)}}>
                            <Icon  
                                size={45}
                                colors={[
                                    {color:"#206593",offset:"0",opacity:"1"},
                                    {color:"#25EADE",offset:"1",opacity:"1"},
                                ]}
                                name="share" type="material-community" />  
                                <Text>Compartir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress ={()=>{copyToClipboard(user.uid)}}>
                            <Icon  
                                size={45}
                                colors={[
                                    {color:"#206593",offset:"0",opacity:"1"},
                                    {color:"#25EADE",offset:"1",opacity:"1"},
                                ]}
                                name="content-copy" type="material-community" />  
                                <Text>copiar</Text>
                        </TouchableOpacity>
                    </View>
                </View>                   

        

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttom}>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <QrGenerator value={user.uid} size={170}/>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttom} onPress={()=> handleLogout()}>
                        <Icon  
                            size={iconSize}
                            colors={[
                                {color:"#206593",offset:"0",opacity:"1"},
                                {color:"#25EADE",offset:"1",opacity:"1"},
                            ]}
                            name="logout" type="material-community" />  
                            <Text style={styles.text}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        flex:1,  
        flexWrap:"wrap", 
    },
    container2:{
        width:width,
        flex:1,  
        flexWrap:"wrap",   
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
        textAlign:"center",
        width:"100%",
    }
})

export default MyAcount


