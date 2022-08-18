import { StatusBar } from 'expo-status-bar';
import { TextInput, Pressable, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default function Modificar() {
  return (
    <View style={styles.container}>
        <Pressable style={styles.btnListaAModificar}>
            <Text
                style={styles.btnTextoListaAModificar}>ver lista a modificar...
            </Text>
        </Pressable>
        <View style={styles.container2}>
             <Pressable style={styles.btn}>
                <Text
                    style={styles.btnTexto}>aumentar precios
                </Text>
            </Pressable>
            <Pressable style={styles.btn}>
                <Text
                    style={styles.btnTexto}>disminuir precios
                </Text>
            </Pressable>
        </View>
        <View style={styles.container3}>
            <TextInput
                style={styles.input}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
            <Pressable style={styles.btn2}>
                <Text
                    style={styles.btnTexto2}>porcentaje
                </Text>
            </Pressable>
        </View>
            <Pressable style={styles.btn3}>
                <Text
                    style={styles.btnTexto3}>aplicar
                </Text>
            </Pressable>
            <Pressable style={styles.btnListaModificado}>
            <Text
                style={styles.btnTextoListaAModificar}>ver lista modificada...
            </Text>
        </Pressable>
        <View style={styles.container4}>
             <Pressable style={styles.btnSalir}>
                <Text
                    style={styles.btnTextoGuardar}>guardar
                </Text>
            </Pressable>
            <Pressable style={styles.btnGuardar}>
                <Text
                    style={styles.btnTextoGuardar}>modificar
                </Text>
            </Pressable>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow:1,
    backgroundColor: '#fff',
  },
  btnListaAModificar: {
    backgroundColor: '#DBD7D7',
    padding: 15,
    marginTop: 150,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoListaAModificar: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  container2: {
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent:'space-around',
  },
  btn: {
    width: "42%",
    height: 72,
    backgroundColor: '#DBD7D7',
    padding: 15,
    marginTop: 50,
    borderRadius: 10
  },
  btnTexto: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  container3: {
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent:'center',
  },
  input: {
    marginTop: 39,
    height: 40,
    width: "30%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginHorizontal:0,
    borderRadius: 10
  },
  btn2: {
    width: "42%",
    height: 52,
    backgroundColor: '#22D4FB',
    padding: 15,
    marginTop: 30,
    borderRadius: 30
  },
  btnTexto2: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  btn3: {
    marginHorizontal:120,
    height: 52,
    backgroundColor: '#22D4FB',
    padding: 15,
    marginTop: 20,
    borderRadius: 10
  },
  btnTexto3: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  btnListaModificado: {
    backgroundColor: '#8CEF3E',
    padding: 15,
    marginTop: 70,
    marginHorizontal: 20,
    borderRadius: 10
  },
  container4: {
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent:'space-between',
  },
  btnGuardar: {
    marginHorizontal:15,
    height: 52,
    backgroundColor: '#8CEF3E',
    padding: 15,
    marginTop: 20,
    borderRadius: 10
  },
  btnSalir: {
    marginHorizontal:15,
    height: 52,
    backgroundColor: '#EF3E3E',
    padding: 15,
    marginTop: 20,
    borderRadius: 10
  },
  btnTextoGuardar: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  
});