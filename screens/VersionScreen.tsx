import React, { useState, useEffect, version } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Alert } from 'react-native';
import { RootStackParamList, VersionType } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { get_lyrics, get_music_versions } from '../functions/requests'


export default function VersionScreen({ navigation, route }: StackScreenProps<RootStackParamList>) {
  const [loading, setLoading] = useState(false);
  const [versions, setVersions] = useState([]);
  const [lyrics, setLyrics] = useState(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      get_music_versions(route.params.music_id).then(versions => {
        setLoading(false);
        setVersions(versions);
      }).catch(error => {
        Alert.alert(error.title, error.message);
      })
      get_lyrics(route.params.music_id).then(lyrics => {
        setLyrics(lyrics)
      }).catch(error => {
        setLyrics(null);
      })
    })
    return unsubscribe;
  }, [navigation])
  return (
    <View style={[styles.container, { width: '100%', height: '100%', padding: 15 }]}>
      {
        loading ? <ActivityIndicator /> :
          <ScrollView>
            {
              lyrics==null ? null :
                <TouchableOpacity
                  style={styles.card}
                  onPress={()=>{
                    navigation.navigate('ChordScreen', { chord_id: lyrics.id })
                  }}
                >
                  <Image
                    style={styles.icon_30}
                    source={require('../assets/images/paper_icon.png')}
                  />
                  <Text style={styles.card_h1}> Apenas a Letra </Text>
                </TouchableOpacity>
            }
            {
              versions.map((version: VersionType, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.card}
                    onPress={() => navigation.navigate('ChordScreen', { chord_id: version.id })}
                  >
                    <View style={styles.left}>
                      <Text style={styles.card_h1}>{version.name}</Text>
                      <Text style={styles.card_h2}> Escrito por <Text style={{ color: '#2F80ED' }}>{`@${version.author.user.username}`}</Text></Text>
                    </View>
                    <View style={styles.right}>
                      <View style={styles.like_container}>
                        <Image
                          style={styles.icon_25}
                          source={require('../assets/images/like_icon_green.png')}
                        />
                        <Text style={styles.like_text}>{version.likes}</Text>
                      </View>
                      <View style={styles.like_container}>
                        <Image
                          style={styles.icon_25}
                          source={require('../assets/images/unlike_icon_red.png')}
                        />
                        <Text style={styles.unlike_text}>{version.unlikes}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  icon_30: {
    height: 30,
    width: 30,
    marginRight: 20,
  },
  icon_25: {
    height: 25,
    width: 25,
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
  left: {
    flex: 3
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  like_container: {
    alignItems: 'center'
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
  }
});