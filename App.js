import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Contador from './Contador.js';

export default function App() {

  const [estado, setarEstado] = useState('selecionar');
  const [segundos, setarSegundos] = useState(1);
  const [minutos, setarMinutos] = useState(0);

  const [alarmeSound, setarAlarmeSound] = useState([
    {
      selecionado: true,
      id: 1,
      som: 'alarme 1',
      file: require('./assets/alarme1.mp3'),
    },
    {
      selecionado: false,
      id: 2,
      som: 'alarme 2',
      file: require('./assets/alarme2.mp3'),
    },
    {
      selecionado: false,
      id: 3,
      som: 'alarme 3',
      file: require('./assets/alarme3.mp3'),
    },
  ]);

  var numeros = [];
  for (var i = 1; i <= 60; i++) {
    numeros.push(i);
  }

  function setarAlarme(id) {
    let alarmesTemp = alarmeSound.map(function (val) {
      if (id != val.id)
        val.selecionado = false;
      else
        val.selecionado = true;
      return val;
    })
    setarAlarmeSound(alarmesTemp);
  }

  if (estado == 'selecionar') {
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

        <Text style={{ color: 'white', fontSize: 35, }}>Selecione o seu tempo:</Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', paddingTop: 16, fontSize: 16 }}>Min:</Text>
          <Picker style={{ height: 50, width: 100, color: 'white' }}
            selectedValue={minutos}
            onValueChange={(itemValue, itemIndex) =>
              setarMinutos(itemValue)
            }>
            <Picker.Item label='0' value='0' />
            {
              numeros.map(function (val) {
                return (<Picker.Item label={val.toString()} value={val.toString()} />)
              })

            }

          </Picker>

          <Text style={{ color: 'white', paddingTop: 16, fontSize: 16 }}>Seg:</Text>
          <Picker style={{ height: 50, width: 100, color: 'white' }}
            selectedValue={segundos}
            onValueChange={(itemValue, itemIndex) =>
              setarSegundos(itemValue)
            }>

            {
              numeros.map(function (val) {
                return (<Picker.Item label={val.toString()} value={val.toString()} />)
              })

            }

          </Picker>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {
            alarmeSound.map(function (val) {
              if (val.selecionado) {
                return (
                  <TouchableOpacity onPress={() => setarAlarme(val.id)} style={styles.btnSelecionado}>
                    <Text style={{ color: 'white' }}>{val.som}</Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity onPress={() => setarAlarme(val.id)} style={styles.btnEscolher}>
                    <Text style={{ color: 'white' }}>{val.som}</Text>
                  </TouchableOpacity>
                );
              }
            })
          }
        </View>

        <TouchableOpacity style={styles.btnIniciar} onPress={() => setarEstado('iniciar')}>
          <Text style={{ textAlign: 'center', color: 'white', paddingTop: 30, fontSize: 22 }}>
            Iniciar
          </Text>
        </TouchableOpacity>

      </View>
    );
  } else if (estado == 'iniciar') {

    return (
      <Contador alarmes={alarmeSound} setarMinutos={setarMinutos} setarSegundos={setarSegundos} setarEstado={setarEstado} minutos={minutos} segundos={segundos}></Contador>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEscolher: {
    marginRight: 10,
    padding: 8,
    backgroundColor: 'rgb(61, 61, 61)',
  },
  btnSelecionado: {
    marginRight: 10,
    padding: 8,
    backgroundColor: 'rgba(61, 61, 61, 0.7)',
    borderColor: 'rgba(61, 61, 61, 1)',
    borderWidth: 1,
  },
  btnIniciar: {
    backgroundColor: 'rgb(61, 61, 61)',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
    marginTop: 30,
    borderWidth: 2,
  }
});
