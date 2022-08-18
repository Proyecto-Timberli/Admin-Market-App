import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

const NavBar = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
            style = {{
                ...styles.itemNavBar,
                backgroundColor: '#4F517D',
            }}
        >
            <Text
                style = {{
                    ...styles.texto,
                    color: '#fff',
                }}
            >
                Productos
            </Text>
        </TouchableOpacity>
        <View style={styles.itemNavBarLogo}>
            <Image style={styles.logo} source={require('../../assets/iconos/home.png')} />
        </View>
        <TouchableOpacity 
            style = {{
                ...styles.itemNavBar,
                backgroundColor: '#4F517D',
            }}
        >
            <Text
                style = {{
                    ...styles.texto,
                    color: '#fff',
                }}
            >
                Escanear
            </Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        elevation: 10,
        flexDirection: 'row',
    },
    itemNavBar: {
        width: '36%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,

        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    logo: {
        width: 50,
        height: 50,
    }


});

export default NavBar;