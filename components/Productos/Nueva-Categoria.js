import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const NuevaCategoria = () => {
  let [array, setArray] = useState([
    "Perfumeria",
    "Kiosco",
    "Fiambreria",
    "Galletitas",
  ]);

  const [categoria, setCategoria] = useState("");

  const [text, setText] = useState("");

  const agregarCategoria = function (e) {
    if (e == "") {
      Alert.alert("Escribí una Categoria");
      return;
    }
    if (array.includes(e)) {
      Alert.alert("Esa categoria ya existe!");
      return;
    }
    setArray([...array, e]);
    setText("");
  };

  const eliminarCategoria = function (e) {
    let respuesta = array.filter((a) => a !== e);
    setArray(respuesta);
    setCategoria("");
  };

  return (
    <View style={estilos.container}>
      <Text>Categorias Actuales</Text>
      <FlatList
        style={estilos.listado}
        data={array}
        renderItem={(e) => (
          <View key={e}>
            <TouchableOpacity onPress={() => setCategoria(e)}>
              <Text
                style={categoria === e ? estilos.textoActivo : estilos.texto}
              >
                {e}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>
      {categoria ? (
        <View>
          <TouchableOpacity
            style={estilos.botonEliminar}
            onPress={() => eliminarCategoria(categoria)}
          >
            <Text>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View>
        <TextInput
          style={estilos.inputTexto}
          placeholder="Escriba su nueva categoria aquí"
          onChangeText={(e) => setText(e)}
          value={text}
        />
        <View style={estilos.cajaBotones}>
          <TouchableOpacity style={estilos.botonRojo}>
            <Text>Salir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.botonVerde}
            onPress={() => agregarCategoria(text)}
          >
            <Text>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: { display: "flex", alignItems: "center" },
  listado: {
    borderWidth: 2,
    borderRadius: 50,
    width: 120,
    backgroundColor: "grey",
  },
  texto: { textAlign: "center" },
  textoActivo: { textAlign: "center", backgroundColor: "green" },
  inputTexto: {
    height: "35%",
    borderWidth: 1,
    borderRadius: 9,
    padding: 10,
  },
  cajaBotones: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botonRojo: { backgroundColor: "red", padding: 7, borderRadius: 2 },
  botonVerde: { backgroundColor: "green", padding: 7, borderRadius: 2 },

  botonEliminar: {
    marginTop: 7,
    backgroundColor: "red",
    padding: 7,
    borderRadius: 2,
    borderWidth: 1,
  },
});

export default NuevaCategoria;
