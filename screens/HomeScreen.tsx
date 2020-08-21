import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ActivityIndicator, Alert } from 'react-native';
import { RootStackParamList, VersionType, ArtistType } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get_top_versions, get_top_artists } from '../functions/requests'
import Spinner from '../components/Spinner'

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

  return (
    <View style={[styles.container, { width: '100%', height: '100%', padding: 15 }]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}> Cifras em alta </Text>
          <View style={styles.separator} />
        </View>
        {
          versions_loading ? <ActivityIndicator/> :
          top_versions.map((version: VersionType, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.chord_card}
                onPress={() => {
                  navigation.navigate('ChordScreen', { chord_id: version.id })
                }}
              >
                <View style={styles.left}>
                  <Text style={styles.card_h1}> {version.music.name} </Text>
                  <Text style={styles.card_h3}> {version.music.artist.name} </Text>
                </View>
                <View style={styles.vertical_separator} />
                <View style={styles.right}>
                  <Text style={styles.card_h1}>Versão</Text>

                  <Text style={styles.card_h3}><Text style={{ color: '#828282' }}>{version.name} </Text></Text>
                </View>
              </TouchableOpacity>
            );
          })
        }

        <View style={[styles.container, { paddingTop: 20 }]}>
          <Text style={styles.title}> Artistas em alta </Text>
          <View style={styles.separator} />
        </View>

        {
          artists_loading ? <ActivityIndicator/> :
          top_artists.map((artist: ArtistType, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.artist_card}
                onPress={() => {
                  navigation.push('ArtistScreen', { artist_id: artist.id })
                }}
              >
                <Text style={styles.card_h1}> {artist.name} </Text>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 16,
    fontFamily: 'roboto-bold',
    color: '#333333'
  },
  separator: {
    height: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  chord_card: {
    height: 70,
    width: '100%',
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  vertical_separator: {
    height: '100%',
    borderLeftColor: '#E4E4E4',
    borderLeftWidth: 1,
    marginRight: 10,
    marginLeft: 10
  },
  left: {
    flex: 1
  },
  right: {
    flex: 1,
  },
  card_h1: {
    fontSize: 14,
    fontFamily: 'roboto-bold',
    color: '#333333'
  },
  card_h2: {
    fontSize: 12,
    fontFamily: 'roboto',
    color: '#828282'
  },
  card_h3: {
    fontSize: 12,
    fontFamily: 'roboto',
    color: '#2F80ED'
  },
  like_container: {
    alignItems: 'center'
  },
  icon: {
    height: 25,
    width: 25,
  },
  like_text: {
    fontSize: 12,
    fontFamily: 'roboto-bold',
    color: '#6FCF97'
  },
  unlike_text: {
    fontSize: 12,
    fontFamily: 'roboto-bold',
    color: '#EB5757'
  },
  artist_card: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    padding: 10,
    marginTop: 15
  }
});

const hilight_chords = [
  {
    id: 1,
    author: {
      username: 'fulano'
    },
    music: {
      name: 'Creio que tu és a cura',
      author: {
        name: 'Gabriela rocha'
      }
    },
    likes: 255,
    unlikes: 12,
  },
  {
    id: 1,
    author: {
      username: 'fulano'
    },
    music: {
      name: 'Creio que tu és a cura',
      author: {
        name: 'Gabriela rocha'
      }
    },
    likes: 255,
    unlikes: 12,
  },
  {
    id: 1,
    author: {
      username: 'fulano'
    },
    music: {
      name: 'Creio que tu és a cura',
      author: {
        name: 'Gabriela rocha'
      }
    },
    likes: 255,
    unlikes: 12,
  }
]
const hilight_artists = [
  {
    name: 'Gabriela Rocha'
  },
  {
    name: 'Gabriela Rocha'
  },
  {
    name: 'Gabriela Rocha'
  }
]