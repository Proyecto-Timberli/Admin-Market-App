import { StyleSheet} from "react-native";
import MenuMain from './components/MenuMain'


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
