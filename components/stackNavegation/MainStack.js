import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//screens
import Productos from "./stack/Productos";
import Cobrar from "./stack/Cobrar";
import Cuenta from "./stack/Cuenta";
import Configuracion from "./stack/Configuracion";
const Stack = createNativeStackNavigator();
export default function MainStacks(){
    return(
        <NavigationContainer>
            <Stack.Navigator
             initialRouteName="Productos">
                <Stack.Screen name="Productos" component={Productos}/>
             
            </Stack.Navigator>
        </NavigationContainer>
   
    )
}

{/* <Stack.Screen name="Cobrar" component={Cobrar}
                  
/>
<Stack.Screen name="Cuenta" component={Cuenta}

/>
<Stack.Screen name="Configuracion" component={Configuracion}
 
/> */}