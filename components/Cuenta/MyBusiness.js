import {useEffect,useState} from 'react'
import {useAuth} from '../../context/authContext'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-gradient-icon';
import ModalEditar from '../Reutilizables/ModalEditar';
const {width, height} = Dimensions.get('window');
const iconSize= 100;

const MyBusiness=({navigation})=>{
    console.log("------------------------")
    console.log("Cuenta")
    const {user, logout, loading} = useAuth()
    const handleLogout = async ()=>{
        await logout()
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
    const [business,setBusiness] = useState({
        negocio:null,
        de:null,
        cbu:null,
        ubicacion:null,
    })
    const [activeModal, setActiveModal] = useState(false)
    

    console.log("------------------------")
    {/* 
        {modal&&<Modal dato={dato} state={business} setState={setBusiness} stateModal={setModal}/>}
        <Editar dato={"name"} setState={setDato} stateModal={setModal}/> */
    }
    return(
        <View style={styles.container}>
            <View style={{...styles.buttonContainer,width:width,height:height/2}}>
                <TouchableOpacity onPress={()=>setModal(true)}style={{ 
                    width: width/4,
                }}>
                    <Icon  
                        size={iconSize}
                        colors={[
                            {color:"#206593",offset:"0",opacity:"1"},
                            {color:"#25EADE",offset:"1",opacity:"1"},
                        ]}
                        name="storefront" type="material-community" />  
                </TouchableOpacity>
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>Negocio: {null}</Text>
                    <ModalEditar 
                        dato={"negocio"}
                        state={business}
                        setState={setBusiness}
                        setActiveModal={setActiveModal}
                    />
                </View>
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>De: {null}</Text>
                    <ModalEditar 
                        dato={"de"}
                        state={business}
                        setState={setBusiness}
                        setActiveModal={setActiveModal}
                    />
                </View>
                
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>Cuit: {null}</Text>
                    <ModalEditar 
                        dato={"cuit"}
                        state={business}
                        setState={setBusiness}
                        setActiveModal={setActiveModal}
                    />
                </View>
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>Cbu: {null}</Text>
                    <ModalEditar 
                        dato={"cbu"}
                        state={business}
                        setState={setBusiness}
                        setActiveModal={setActiveModal}
                    />
                </View>
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>Ubicacion: {null}</Text>
                    <ModalEditar 
                        dato={"ubicacion"}
                        state={business}
                        setState={setBusiness}
                        setActiveModal={setActiveModal}
                    />
                </View>
            </View>
       
        
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttom} onPress={()=> navigation.navigate("Link-Profile-To-User")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="link-variant-plus" type="material-community" />  
                    <Text style={{textAlign:"center",}}>Vincular Usuario</Text>
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
        width:"60%",
        textAlign: "left",
    },
    cotainerIcon: {
        width: width*0.7,
        backgroundColor: '#fff',
        flexWrap:"wrap",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin:3,
        padding:2,
    },
})

export default MyBusiness