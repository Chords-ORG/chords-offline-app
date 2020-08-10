import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { ProfileStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export default function SampleScreen({ navigation }: StackScreenProps<ProfileStackParamList, 'Login'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <View style={styles.title_container}>
        <Text style={styles.h1}> Bem Vindo de volta </Text>
        <Text style={styles.h2}> Ultilize sua conta no chords para publicar e avaliar cifras da plataforma </Text>
      </View>

      <View>
        <View style={styles.input_container}>
          <Image
            style={styles.icon}
            source={require('../assets/images/id_icon.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Username ou email"
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={styles.input_container}>
          <Image
            style={styles.icon}
            source={require('../assets/images/key_icon.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Senha"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_text}> Entrar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.h3}> Ainda não possui conta? <Text style={{ color: '#2F80ED' }}> Inscreva-se </Text></Text>
        </TouchableOpacity>

        <TouchableOpacity
        >
          <Text style={[styles.h3, { color: '#2F80ED' }]}> Esqueci minha senha </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-around'
  },
  title_container: {
    alignItems: 'center',
  },
  h1: {
    fontFamily: 'roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  h2: {
    fontFamily: 'roboto',
    fontSize: 12,
    color: '#828282',
    textAlign: 'center'
  },
  h3: {
    fontFamily: 'roboto',
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    margin:5,
  },
  input_container: {
    borderWidth: 1,
    borderColor: '#828282',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: '#2F80ED',
    borderRadius: 5,
    height: 40,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin:15,
  },
  button_text: {
    fontFamily: 'roboto-bold',
    fontSize: 14,
    color: '#F2F2F2',
  }
});
