// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet } from "react-native";

// // Navigation
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// // Components
// import Register from "./Login/Practice/Register";
// import Home from "./Login/Practice/Home";
// import Login from "./Login/Login";
// import UsersList from "./Login/Practice/usersList";
// import PeticionPrueba from "./Login/Practice/firestore"
// import Customers from './Clientes/Customers'
// import InformationClient from './Clientes/Client-Edit-Info'
// import AddClient from './Clientes/Add-Client'
// import Providers from './Provedores/Providers'
// import AddProvider from './Provedores/Add-Provider'
// import InformationProvider from './Provedores/Provider-Edit-Info'

// import {AuthProvider, } from '../context/authContext'

// const Stack = createStackNavigator();

// function MyStack() {
  
//   return (
//     <AuthProvider>
//         <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//         >  
//         <Stack.Screen
//           name="Register"
//           component={Register}
//         />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//         />
//         <Stack.Screen
//           name="UsersList"
//           component={UsersList}
//           options={{ title: "Users List" }}
//         />    
//         <Stack.Screen
//           name="Home"
//           component={PeticionPrueba}
//         />
//         <Stack.Screen
//           name="Customers"
//           component={Customers}
//         />
//         <Stack.Screen
//           name="Client-info"
//           component={InformationClient}
//         />
//           <Stack.Screen
//           name="Add-client"
//           component={AddClient}
//         />
//         <Stack.Screen
//           name="Providers"
//           component={Providers}
//         />
//         <Stack.Screen
//           name="Add-providers"
//           component={AddProvider}
//         />
//         <Stack.Screen
//           name="Provider-info"
//           component={InformationProvider}
//         />
//       </Stack.Navigator>
//     </AuthProvider>
    
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
