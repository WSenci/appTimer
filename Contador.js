import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function Contador(props) {

    var done = false;

    useEffect(() => {

        const timer = setInterval(() => {

            props.setarSegundos(props.segundos - 1);

            if (props.segundos <= 0) {
                if (props.minutos > 0) {
                    props.setarMinutos(props.minutos - 1);
                    props.setarSegundos(59)
                } else {
                    if (!done) {
                        done = true;
                        props.setarEstado('selecionar');
                        props.setarMinutos(0);
                        props.setarSegundos(1);
                        playSound();
                    }
                }
            }

        }, 1000);

        return () => clearInterval(timer);

    })

    async function playSound() {

        const sound = new Audio.Sound();
        try {
            var alarme;
            props.alarmes.map(function (val) {
                if (val.selecionado) {
                    alarme = val.file;
                }
            })
            await sound.loadAsync(alarme);
            await sound.playAsync();
            // Your sound is playing!

            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
            // await sound.unloadAsync();
        } catch (error) {
            // An error occurred!
        }

    };

    function resetar() {
        props.setarEstado('selecionar');
        props.setarMinutos(0);
        props.setarSegundos(1);
    }

    function formatarNumero(number) {
        var finalNumber = '';
        if (number < 10) {
            finalNumber = '0' + number;
        } else {
            finalNumber = number;
        }
        return finalNumber;
    }

    var segundos = formatarNumero(props.segundos);
    var minutos = formatarNumero(props.minutos);

    return (

        <View style={styles.container} >
            <StatusBar style="auto" />

            <LinearGradient
                // Background Linear Gradient
                colors={['#24babf', '#808080']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%',
                }}
            />

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textContador}>{minutos} : </Text>
                <Text style={styles.textContador}>{segundos}</Text>
            </View>

            <TouchableOpacity style={styles.btnPausar} onPress={() => resetar()}>
                <Text style={{ textAlign: 'center', color: 'white', paddingTop: 30, fontSize: 22 }}>
                    Resetar
                </Text>
            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#808080',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContador: {
        color: 'white',
        fontSize: 50,
    },
    btnPausar: {
        backgroundColor: 'rgb(61, 61, 61)',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'white',
        marginTop: 30,
        borderWidth: 2,
    },
});
