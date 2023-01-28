import { StyleSheet, Text, View } from "react-native";
import MenuMain from './components/MenuMain'
// import AppPractice from './components/Login/Practice/appPracrtce'
export default function App() {
  return ( 
    <MenuMain/> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
