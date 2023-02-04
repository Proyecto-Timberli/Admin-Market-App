import {useEffect} from 'react'
import {useAuth} from '../../context/authContext'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-gradient-icon';
const {width, height} = Dimensions.get('window');
const iconSize= 100;
const Cuenta=({navigation})=>{
    console.log("------------------------")
    console.log("Cuenta")
    const {user, logout, loading} = useAuth()
    const handleLogout = async ()=>{
        await logout()
        return navigation.navigate("Login")
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
    // return( 
    //     <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
    //         <Text style={{color:"black"}}>cuenta: {user.email}</Text>
    //         <Text style={{color:"black"}}>code: {user.uid}</Text>
    //         <TouchableOpacity onPress={()=> handleLogout()}><Text>LogOut</Text></TouchableOpacity>  
    //         <TouchableOpacity onPress={()=> navigation.navigate("MyProfiles")}><Text>Mis Perfiles</Text></TouchableOpacity>  
    //         <TouchableOpacity onPress={()=> navigation.navigate("Profiles")}><Text style={{color:"black"}}>Administrar perfiles de negocio para los usuarios</Text></TouchableOpacity>
    //         <Text style={{color:"black"}}></Text>
    //     </View>     
    // )
    return(
        <View style={styles.container}>
       
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={()=> navigation.navigate("MyAcount")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="account-box" type="material-community" />  
                    <Text style={styles.text}>Mi cuenta</Text>
            </TouchableOpacity>
            </View>
         
                     <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={()=> navigation.navigate("MyBusiness")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="storefront" type="material-community" />  
                    <Text style={styles.text}>Mi Negocio</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={()=> navigation.navigate("MyProfiles")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="account-convert" type="material-community" />  
                    <Text style={styles.text}>Mis Perfiles</Text>
            </TouchableOpacity>
            </View>
  
            {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom}>
            </TouchableOpacity>
            </View> */}
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom}>
            </TouchableOpacity>
            </View>
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom}>
            </TouchableOpacity>
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
    );
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

export default Cuenta