import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { VersionStackParamList, MusicType } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { search_music } from '../functions/requests'


export default function FindMusic({ navigation }: StackScreenProps<VersionStackParamList, 'FindMusic'>) {
  const [loading, setLoading] = useState(false)
  const [music_results, setMusics] = useState([])
  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <View style={styles.header}>
        <Image
          style={styles.icon}
          source={require('../assets/images/search_icon.png')}
        />
        <TextInput
          style={styles.text_input}
          onChangeText={(text) => {
            setLoading(true);
            search_music(text).then(results => {
              setLoading(false);
              setMusics(results);
            }).catch(error => {
              setLoading(false);
              Alert.alert(error.title, error.message)
            })
          }}
          placeholder="Escolha a musica"
          maxLength={40}
        />
      </View>
      <View style={styles.separator}/>
      <ScrollView style={[styles.container, { padding: 15 }]}>
        {
          loading ? <ActivityIndicator /> :
            music_results.map((music: MusicType, i) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={i}
                  onPress={() => navigation.push('WriteChords', { music_id: music.id })}
                >
                  <Text style={styles.card_h1}>{music.name}</Text>
                  <Text style={styles.card_h2}>{music.artist.name}</Text>
                </TouchableOpacity>
              );
            })
        }
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    marginTop:10,
    height: 60,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent:'center',
    alignSelf:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: '#000',
    borderBottomWidth:1,
    borderColor:'#BDBDBD',
    borderRadius:5,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  text_input: {
    flex:1
  },
  separator:{
    width:'100%',
    borderBottomColor:'#E4E4E4',
    borderBottomWidth:1,
    marginTop:10,
    marginBottom:10,
  },
  card: {
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
  card_h1: {
    fontSize: 14,
    fontFamily: 'roboto-bold',
    color: '#333333',

  },
  card_h2: {
    fontSize: 12,
    fontFamily: 'roboto',
    color: '#828282'
  },
});
