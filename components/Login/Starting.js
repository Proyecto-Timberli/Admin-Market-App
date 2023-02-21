import React, { useEffect,useState} from "react";
import {postFirestoreId} from '../../functions/apiFunctions'
import {useAuth} from '../../context/authContext'
import {getFirestore,doc, getDoc} from 'firebase/firestore';
import Loading from '../../functions/Loading'
import { TextInput, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
const {width, height} = Dimensions.get('window');
const Starting =  ({navigation})=> {
    const SvgComponent = () => (
        <Svg
          width={408}
          height={274}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m0 254.39 17-42.398c17-42.399 51-127.195 85-127.195s68 84.796 102 133.252c34 48.455 68 60.569 102 54.512 34-6.057 68-30.285 85-42.399l17-12.113V0H0v254.39Z"
            fill="url(#a)"
            fillOpacity={0.93}
          />
          <Defs>
            <LinearGradient
              id="a"
              x1={204}
              y1={0}
              x2={204}
              y2={274}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#206593" />
              <Stop offset={1} stopColor="#25EADE" stopOpacity={0.81} />
            </LinearGradient>
          </Defs>
        </Svg>
    )
    console.log("------------------------")
    console.log("Starting")
    const {user} = useAuth()
    const [state,setState]=useState(null)
    const postUser =()=>{
        const docRef =doc(getFirestore(),"users/"+user.uid)
        getDoc(docRef).then(res => setState(res.data()))
        
    }
    useEffect(() => {
        console.log("Inicializando Cuenta")
        if (user){   postUser()  }
    },[])
    useEffect(() => {
        if (user){                                
            if(!state?.identifier){
                const docRef =doc(getFirestore(),"users/"+user.uid)
                postFirestoreId(docRef,{identifier:user.email})
                navigation.navigate("MyProfiles")

            }else{
                console.log(state)
                navigation.navigate("MyProfiles")
            }
            
        }
    },[state])
    console.log("------------------------")
    return (
        <View style={styles.container}> 
            {/* <SvgComponent style={styles.containerSVG}/> */}
            <Loading/>
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"#f1f1f1",
    },
    containerSVG:{
        alignItems:"center",
        justifyContent: "flex-start",
        width:width,
    },
    title:{
        fontSize:80,
        color:"#000",
        fontWeight: "bold",
    },
    subTitle:{
        fontSize:20,
        color:"gray",
    },
    textInput:{
        padding: 10,
        paddingStart:30,
        width:"80%",
        height:50,
        marginTop:20,
        borderRadius:30,
        backgroundColor:"#fff"
    },
    subTitle2:{
        marginTop:10,
        fontSize:15,
        color:"gray",
    },
})

export default Starting