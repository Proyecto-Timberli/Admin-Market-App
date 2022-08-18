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
        // style={estilos.listado}
        data={array}
        keyExtractor={(item) => item}
        // style={{ borderWidth: 2 }}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={
                categoria === item ? estilos.listadoActivo : estilos.listado
              }
              onPress={() => setCategoria(item)}
            >
              <Text style={estilos.texto}>{item}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {categoria ? (
        <View style={{ alignItems: "center" }}>
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
          placeholder="Escriba su nueva categoria aquí..."
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
  container: {
    height: "100%",
    display: "flex",
    marginHorizontal: 30,
    alignContent: "space-around",
  },
  listado: {
    margin: 1,
    padding: 3,
    backgroundColor: "#DBD7D7",
    paddingVertical: 10,
  },
  listadoActivo: {
    margin: 1,

    padding: 3,
    backgroundColor: "#8CEF3E",
    paddingVertical: 10,
  },
  texto: { fontSize: 18, color: "black", textAlign: "center" },

  inputTexto: {
    fontSize: 18,
    height: "35%",

    backgroundColor: "#DBD7D7",
    marginBottom: 10,

    borderRadius: 9,
    padding: 10,
  },
  cajaBotones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botonRojo: {
    backgroundColor: "#EF3E3E",
    padding: 7,
    width: 83,
    alignItems: "center",
    borderRadius: 4,
  },
  botonVerde: {
    backgroundColor: "#8CEF3E",
    padding: 7,
    width: 83,
    alignItems: "center",
    borderRadius: 4,
  },

  botonEliminar: {
    marginTop: 7,
    backgroundColor: "#EF3E3E",
    padding: 7,
    width: 83,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 4,
  },
});

export default NuevaCategoria;
