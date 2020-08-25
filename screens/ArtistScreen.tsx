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
import { light_style, dark_style } from '../constants/Styles'

export default function ArtistScreen({ navigation, route }: StackScreenProps<RootStackParamList, 'ArtistScreen'>) {
  const load_data = async (artist_id: number) => {
    setLoading(true);
    const artist = await get_artist(artist_id);
    const musics = await get_artist_musics(artist_id);
    setArtist(artist);
    setMusics(musics);
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      load_data(route.params.artist_id).catch(error => {
        setLoading(false);
        Alert.alert(error.title, error.message)
      })
    })
    return unsubscribe;
  }, [navigation])
  const [loading, setLoading] = useState(false)
  const [artist, setArtist] = useState(sample_artist)
  const [musics, setMusics] = useState([])
  const [basic_style, setBasicStyle] = useState(light_style);

  return (
    <View style={[basic_style.container, { width: '100%', height: '100%' }]}>
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
          <Text style={[basic_style.h1, basic_style.primary_color, basic_style.bold]}> Chords </Text>
        </View>
      </View>
      {
        loading ? <ActivityIndicator size="large" /> :
          <View style={[basic_style.container, { padding: 15 }]}>
            <Text style={[basic_style.h1, basic_style.primary_color, basic_style.bold]}>{artist.name}</Text>
            <Text style={[basic_style.h4, basic_style.secondary_color]}>{`Visitas esta semana: ${artist.season_visits}`}</Text>
            <Text style={[basic_style.h4, basic_style.secondary_color]}>{`Visitas totais: ${artist.total_visits}`}</Text>
            <View style={styles.sub_header}>
              <Text style={[basic_style.h2, basic_style.primary_color, basic_style.bold]}> Musicas</Text>
              <View style={basic_style.horizontal_separator} />
            </View>
            <View>
              <ScrollView>
                {
                  musics.map((music: MusicType, i) => {
                    return (
                      <TouchableOpacity
                        style={[basic_style.small_card, { justifyContent: 'center' }]}
                        key={i}
                        onPress={() => {
                          navigation.push('Root', { screen: 'Search', params: { screen: 'ChoseVersion', params: { music_id: music.id } } })
                        }}
                      >
                        <Text style={[basic_style.h3, basic_style.primary_color, basic_style.bold]}>{music.name}</Text>
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
  app_logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  sub_header: {
    marginTop: 20,
  },
});

const sample_artist = {
  id: 0,
  name: '',
  total_visits: 0,
  season_visits: 0,
}
