import { StyleSheet, Text, View } from "react-native";
import NavBar from "./components/Productos/NavBar";
export default function App() {
  return (
    <View>
      <NavBar />
    </View>
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
