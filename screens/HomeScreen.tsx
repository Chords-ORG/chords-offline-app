import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ActivityIndicator, Alert, Button } from 'react-native';
import { RootStackParamList, VersionType, ArtistType } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get_top_versions, get_top_artists } from '../functions/requests'
import Spinner from '../components/Spinner'
import { light_style, dark_style } from '../constants/Styles'

export default function HomeScreen({ navigation, route }: StackScreenProps<RootStackParamList>) {

  const load_data = async () => {
    setVersionsLoading(true);
    setArtistsLoading(true);
    const versions = await get_top_versions();
    setTopVersions(versions);
    setVersionsLoading(false);
    const artists = await get_top_artists();
    setTopArtists(artists);
    setArtistsLoading(false);
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setVersionsLoading(true);
      load_data().catch(error => {
        Alert.alert(error.title, error.message);
        console.log(error)
      })
    });
    return unsubscribe;
  }, [navigation]);
  const [top_versions, setTopVersions] = useState([])
  const [top_artists, setTopArtists] = useState([])
  const [versions_loading, setVersionsLoading] = useState(false)
  const [artists_loading, setArtistsLoading] = useState(false)
  const [basic_style, setBasicStyle] = useState(light_style);

  return (
    <View style={[basic_style.container, { width: '100%', height: '100%', padding: 15 }]}>
      <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChordScreen', { chord_id: 1 })
          }}
        >
          <Text>Create chord</Text> 
      </TouchableOpacity>
      <ScrollView>
        <View style={basic_style.container}>
          <Text style={[basic_style.h2, basic_style.primary_color, basic_style.bold]}> Cifras em alta </Text>
          <View style={basic_style.horizontal_separator} />
        </View>
        {
          versions_loading ? <ActivityIndicator /> :
            top_versions.map((version: VersionType, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={[basic_style.big_card, { flexDirection: 'row' }]}
                  onPress={() => {
                    navigation.navigate('ChordScreen', { chord_id: version.id })
                  }}
                >
                  <View style={styles.left}>
                    <Text style={[basic_style.h3, basic_style.primary_color, basic_style.bold]}> {version.music.name} </Text>
                    <Text style={[basic_style.h4, basic_style.active_color ]}> {version.music.artist.name} </Text>
                  </View>
                  <View style={basic_style.vertical_separator} />
                  <View style={styles.right}>
                    <Text style={[basic_style.h3, basic_style.primary_color, basic_style.bold]}>Versão</Text>

                    <Text style={[basic_style.h4, basic_style.secondary_color]}><Text style={{ color: '#828282' }}>{version.name} </Text></Text>
                  </View>
                </TouchableOpacity>
              );
            })
        }

        <View style={[basic_style.container, { paddingTop: 20 }]}>
          <Text style={[basic_style.h2, basic_style.primary_color, basic_style.bold]}> Artistas em alta </Text>
          <View style={basic_style.horizontal_separator} />
        </View>

        {
          artists_loading ? <ActivityIndicator /> :
            top_artists.map((artist: ArtistType, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={basic_style.small_card}
                  onPress={() => {
                    navigation.push('ArtistScreen', { artist_id: artist.id })
                  }}
                >
                  <Text style={[basic_style.h3, basic_style.primary_color, basic_style.bold]}> {artist.name} </Text>
                </TouchableOpacity>
              );
            })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  left: {
    flex: 1
  },
  right: {
    flex: 1,
  }
});
