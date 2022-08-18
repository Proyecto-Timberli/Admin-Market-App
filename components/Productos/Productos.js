import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CardProducto from "./Card-Producto";

const Productos = () => {
  let numero = [
    { id: 1, nombre: "Queso", categoria: "Lacteos", precio: "600" },
    { id: 2, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 3, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
    { id: 4, nombre: "Queso", categoria: "Lacteos", precio: "600" },
    { id: 5, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 6, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
    { id: 7, nombre: "Queso", categoria: "Lacteos", precio: "600" },
    { id: 8, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 9, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
    { id: 10, nombre: "Queso", categoria: "Lacteos", precio: "600" },
    { id: 11, nombre: "Queso", categoria: "Lacteos", precio: "600" },
    { id: 12, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 13, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
    { id: 14, nombre: "Queso", categoria: "Lacteos", precio: "600" },
    { id: 15, nombre: "Pan", categoria: "Panaderia", precio: "350" },
    { id: 16, nombre: "Fiambre", categoria: "Fiambreria", precio: "400" },
  ];

  let arrayAMostrar = numero;
  let categorias = ["Lacteos", "Panaderia", "Fiambreria"];

  //Funcion Busqueda Nombre
  function filtroName(array, search, attibute) {
    return array.filter(
      (e) =>
        e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase())
    );
  }

  const [filterBySearch, setFilterBySearch] = useState("");

  let filtro = filtroName(numero, filterBySearch, "nombre");
  const filtroBusqueda = function (e) {
    setFilterBySearch(e);
  };

  if (filterBySearch !== "") {
    arrayAMostrar = filtro;
  }

  return (
    <View style={estilos.lista}>
      <View style={estilos.caja}>
        <TextInput
          style={estilos.busqueda}
          onChangeText={(e) => filtroBusqueda(e)}
          value={filterBySearch}
          placeholder="Buscar..."
        />
      </View>
      <FlatList
        style={{ zIndex: 2 }}
        data={arrayAMostrar}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <CardProducto
                key={item.id}
                nombre={item.nombre}
                categoria={item.categoria}
                precio={item.precio}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  lista: { flex: 1, alignItems: "center", marginTop: 40 },
  caja: {
    zIndex: 7,
    elevation: 7,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  busqueda: {
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    width: 200,
    zIndex: 8,
    elevation: 8,
    borderWidth: 1,
    backgroundColor: "white",
  },
});

export default Productos;
