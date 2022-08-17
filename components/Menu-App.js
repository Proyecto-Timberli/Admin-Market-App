import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Productos from "./Productos/Productos";

export default function Prueba() {
  return (
    <View style={styles.container}>
      <Text>Hello world2ssss</Text>
      <Productos />
      <StatusBar style="auto" />
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
