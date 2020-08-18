import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SearchStackParamList, MusicType } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { search_music } from '../functions/requests'
export default function SearchScreen({ navigation }: StackScreenProps<SearchStackParamList, 'Search'>) {
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
          placeholder="Buscar"
          maxLength={40}
        />
      </View>
      <ScrollView style={[styles.container, { padding: 15 }]}>
        {
          loading ? <ActivityIndicator /> :
            music_results.map((music: MusicType, i) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={i}
                  onPress={() => navigation.push('ChoseVersion', { music_id: music.id })}
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
    height: 85,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 35,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: '#000',
    //borderBottomWidth:1,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  text_input: {
    flex:1,
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
