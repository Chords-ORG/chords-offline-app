import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView
} from 'react-native';
import { RootStackParamList, ArtistType, MusicType, SearchStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { get_artist, get_artist_musics } from '../functions/requests'
import { ScrollView } from 'react-native-gesture-handler';

export default function ArtistScreen({ navigation, route }: StackScreenProps<RootStackParamList, 'ArtistScreen'>) {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      get_artist(route.params.artist_id).then((artist) => {
        setArtist(artist);
      }).catch(error => {
        setLoading(false);
        Alert.alert(error.title, error.message)
      })
      get_artist_musics(route.params.artist_id).then((musics) => {
        setMusics(musics);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        Alert.alert(error.title, error.message)
      })
    })
    return unsubscribe;
  }, [navigation])
  const [loading, setLoading] = useState(true)
  const [artist, setArtist] = useState(sample_artist)
  const [musics, setMusics] = useState([])


  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              style={styles.back_icon}
              source={require('../assets/images/back_icon.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.app_logo}
            source={require('../assets/images/app_logo.png')}
          />
          <Text style={styles.header_title}> Chords </Text>
        </View>
      </View>
      {
        loading ? <ActivityIndicator size="large" /> :
          <View style={[styles.container, { padding: 15 }]}>
            <Text style={styles.h1}>{artist.name}</Text>
            <Text style={styles.h3}>{`Visitas esta semana: ${artist.season_visits}`}</Text>
            <Text style={styles.h3}>{`Visitas totais: ${artist.total_visits}`}</Text>
            <View style={styles.sub_header}>
              <Text style={styles.h2}> Musicas</Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.musics_container}>
              <ScrollView>
                {
                  musics.map((music: MusicType, i) => {
                    return (
                      <TouchableOpacity
                        style={styles.card}
                        key={i}
                        onPress={() => {
                          navigation.push('Root', { screen: 'Search', params: { screen: 'ChoseVersion', params: { music_id: music.id } } },)
                        }}
                      >
                        <Text style={styles.card_h1}>{music.name}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
                <View style={{ height: 300 }} />
              </ScrollView>
            </View>
          </View>
      }
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
    justifyContent: 'space-between',
  },
  back_icon: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  header_title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'raleway'
  },
  app_logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  h1: {
    color: '#333333',
    fontSize: 24,
    fontFamily: 'roboto-bold',
  },
  h2: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'roboto-bold',
  },
  h3: {
    color: '#828282',
    fontSize: 12,
    fontFamily: 'roboto',
  },
  sub_header: {
    marginTop: 20,
  },
  separator: {
    width: '100%',
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  musics_container: {
    height: '100%',
  },
  card: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
  card_h1: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'roboto-bold',
  }
});

const sample_artist = {
  id: 0,
  name: '',
  total_visits: 0,
  season_visits: 0,
}
