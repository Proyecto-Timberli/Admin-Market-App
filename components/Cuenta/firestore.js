import {useState, useEffect} from 'react'
import {getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, addDoc} from 'firebase/firestore';
import { View, Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../../context/authContext'
const Cuenta=({navigation})=>{
    const {user, logout, loading} = useAuth()
    const [data, setData] = useState(null)
    const [selectedDoc, setSelectedDoc] = useState(null)
    const [selectedCollection, setSelectedCollection] = useState(null)
    useEffect(async() => {
        const dataBase = getFirestore()
        const selected = doc(dataBase, "users/qDcRzymTV7Op7jTwyZdeu7TxhUM2/products", "dYJ25aAL6xIRK2nCcUqX")
        const selectedC = collection(dataBase, "users/qDcRzymTV7Op7jTwyZdeu7TxhUM2/products")
        setSelectedDoc(selected)
        await getDoc(selected).then(res=> setData(res.data()))
        setSelectedCollection(selectedC)
        //.then(res=>console.log(res.id,res.data()))
        // const selectedCollections = collection(dataBase,"users/qDcRzymTV7Op7jTwyZdeu7TxhUM2/products")
        // getDocs(selectedCollections)

    },[])
    const deletePrueba =()=>{
        console.log(selectedDoc)
        deleteDoc(selectedDoc)
        .then(res => {
            console.log("se elimino el documento");
        })
        .catch(error => {
            console.log(error);
        })
    }
    const putPrueba = ()=>{
        console.log(data)
        const dataCustom={
            ...data,
            // buyprice: 120
            buyprice: 115, description: "600 mlts", image: "\"https://avalos.sv/wp-content/uploads/default-featured-image.png\"", make: "coca-cola", name: "coca-cola ", price: 150, stock: 48
        }
        console.log(selectedDoc)
        setDoc(selectedDoc, dataCustom)
        .then(res => {
            console.log("se modifico el documento");
        })
        .catch(error => {
            console.log(error);
        })
    }
    const postPrueba = ()=>{
        const dataCustom={
            buyprice: 280, description: "1,25 lts", image: "\"https://avalos.sv/wp-content/uploads/default-featured-image.png\"", make: "coca-cola", name: "coca-cola ", price: 350, stock: 25
        }
        console.log(selectedCollection)
        addDoc(selectedCollection, dataCustom)
        .then(res => {
            console.log("se agrego el documento");
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    const handleLogout = async ()=>{
        await logout()
    }
    /////////Protected Screen
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
    /////////Protected Screen
    return( 
        <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
            <Text style={{color:"black"}}>Home</Text>
            <Text style={{color:"black"}}>bienvenido {user.email}</Text>
            <TouchableOpacity onPress={()=> handleLogout()}><Text>LogOut</Text></TouchableOpacity>  
            <Text style={{color:"black"}}>Prueba</Text> 
            <TouchableOpacity
            onPress={()=>putPrueba()}
            ><Text>put</Text></TouchableOpacity>
            <TouchableOpacity
            onPress={()=>deletePrueba()}
            ><Text>delete</Text></TouchableOpacity>
            <TouchableOpacity
            onPress={()=>postPrueba()}
            ><Text>post</Text></TouchableOpacity>
            <TouchableOpacity
            onPress={()=> navigation.navigate("Customers")}
            ><Text>Customers</Text></TouchableOpacity>
            <TouchableOpacity
            onPress={()=> navigation.navigate("Providers")}
            ><Text>Providers</Text></TouchableOpacity>
        </View>     
    )
}
export default Cuenta