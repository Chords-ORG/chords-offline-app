import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native';
import { ProfileStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { register } from '../functions/requests'
import Spinner from '../components/Spinner';

export default function SampleScreen({ navigation }: StackScreenProps<ProfileStackParamList, 'Registration'>) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <Spinner visible={loading}/>
      <View style={styles.title_container}>
        <Text style={styles.h1}> Vamos começar </Text>
        <Text style={styles.h2}> Insira suas informaçoes para a criação da conta. É rapido e fácil </Text>
      </View>

      <View>
        <View style={styles.input_container}>
          <Image
            style={styles.icon}
            source={require('../assets/images/id_icon.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            autoCapitalize={"none"}
          />
        </View>

        <View style={styles.input_container}>
          <Image
            style={styles.icon}
            source={require('../assets/images/mail_icon.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize={"none"}
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
            autoCapitalize={"none"}
            secureTextEntry
          />
        </View>

        <View style={styles.input_container}>
          <Image
            style={styles.icon}
            source={require('../assets/images/user_icon.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Nome"
            onChangeText={(text) => setName(text)}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoading(true);
            register(username, email, password, password).then((response) => {
              setLoading(false);
              navigation.navigate('PickIcon', { name: name });
            }).catch((error) => {
              setLoading(false);
              Alert.alert(error.title, error.message)
            })
          }}
        >
          <Text style={styles.button_text}> Criar conta </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.h3}> Já possui conta? <Text style={{ color: '#2F80ED' }}> Entrar </Text></Text>
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
    margin: 5,
  },
  input_container: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
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
    margin: 15,
  },
  button_text: {
    fontFamily: 'roboto-bold',
    fontSize: 14,
    color: '#F2F2F2',
  }
});