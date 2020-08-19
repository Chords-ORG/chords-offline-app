import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Picker, Alert } from 'react-native';
import { SettingsStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import Spinner from '../components/Spinner'
import { setItem } from '../functions/storage'

export default function SettingsScreen({ navigation }: StackScreenProps<SettingsStackParamList, 'Settings'>) {
  const [dict, setDict] = useState('sharp');
  const [instrument, setInstrument] = useState('guitar');
  const [capo, setCapo] = useState('auto');
  const [loading, setLoading] = useState(false);

  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <Spinner visible={loading} />
      <View style={styles.top_container}>
        <Image
          source={require('../assets/images/app_logo.png')}
          style={styles.app_logo}
        />
        <Text style={styles.app_name}> Chords </Text>
        <Text style={styles.version}>{`Versão: alpha ${Constants.nativeAppVersion}`}</Text>
      </View>

      <View style={styles.bottom_container}>
        <View style={styles.picker}>
          <Text style={styles.label}> Visualização de notas: </Text>
          <View style={styles.separator} />
          <Picker
            selectedValue={dict}
            style={styles.picker_style}
            onValueChange={(itemValue, itemIndex) => {
              setDict(itemValue);
              setLoading(true);
              setItem('dict', itemValue).then(() => {
                setLoading(false);
              }).catch(error => {
                setLoading(false);
                Alert.alert(error.title, error.message);
              })
            }}
          >
            <Picker.Item label="Sustenido #" value="sharp" />
            <Picker.Item label="Bemol b" value="bemol" />
          </Picker>
        </View>

        <View style={styles.picker}>
          <Text style={styles.label}> Instrumento: </Text>
          <View style={styles.separator} />
          <Picker
            selectedValue={instrument}
            style={styles.picker_style}
            onValueChange={(itemValue, itemIndex) => {
              setInstrument(itemValue);
              setLoading(true);
              setItem('instrument', itemValue).then(() => {
                setLoading(false);
              }).catch(error => {
                setLoading(false);
                Alert.alert(error.title, error.message);
              })
            }}
          >
            <Picker.Item label="Violão/Guitarra" value="guitar" />
            <Picker.Item label="Teclado/Piano" value="piano" />
          </Picker>
        </View>

        <View style={styles.picker}>
          <Text style={styles.label}> Capotraste: </Text>
          <View style={styles.separator} />
          <Picker
            selectedValue={capo}
            style={styles.picker_style}
            onValueChange={(itemValue, itemIndex) => {
              setCapo(itemValue);
              setLoading(true);
              setItem('default_capo', itemValue).then(() => {
                setLoading(false);
              }).catch(error => {
                setLoading(true);
                Alert.alert(error.title, error.message);
              })
            }}
          >
            <Picker.Item label="Automático" value="auto" />
            <Picker.Item label="Nunca" value="never" />
          </Picker>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
  top_container: {
  },
  bottom_container: {
    marginTop: 50,
  },
  app_name: {
    fontFamily: 'raleway',
    fontSize: 24,
    textAlign: 'center',
    color: '#000000',
  },
  app_logo: {
    height: 90,
    width: 90,
    alignSelf: 'center'
  },
  version: {
    fontFamily: 'raleway',
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  label: {
    fontFamily: 'roboto-bold',
    color: '#333333',
    fontSize: 14,
  },
  picker_style: {
    height: 50,
    width: '100%',
    color: '#4F4F4F',
  },
  picker_text: {
    fontFamily: 'roboto',
    fontSize: 12,
  },
  separator: {
    height: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  picker: {
    marginBottom: 20,
  }
});
