import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HomeScreen({ navigation, route }: StackScreenProps<RootStackParamList>) {
  return (
    <View style={[styles.container, { width: '100%', height: '100%', padding: 15 }]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}> Cifras em alta </Text>
          <View style={styles.separator} />
        </View>
        {
          hilight_chords.map((chord, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.chord_card}
                onPress={() => {
                  navigation.navigate('ChordScreen', { chord_id: chord.id })
                }}
              >
                <View style={styles.left}>
                  <Text style={styles.card_h1}> {chord.music.name} </Text>
                  <Text style={styles.card_h2}> {chord.music.author.name} </Text>
                  <Text style={styles.card_h3}> Cifra escrita por <Text style={{ color: '#2F80ED' }}>{`@${chord.author.username}`}</Text> </Text>
                </View>
                <View style={styles.right}>
                  <View style={styles.like_container}>
                    <Image
                      style={styles.icon}
                      source={require('../assets/images/like_icon_green.png')}
                    />
                    <Text style={styles.like_text}>{chord.likes}</Text>
                  </View>
                  <View style={styles.like_container}>
                    <Image
                      style={styles.icon}
                      source={require('../assets/images/unlike_icon_red.png')}
                    />
                    <Text style={styles.unlike_text}>{chord.unlikes}</Text>
                  </View>
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
          hilight_artists.map((artist, i) => {
            return (
              <TouchableOpacity key={i} style={styles.artist_card}>
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
  left: {
    flex: 3
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
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
    color: '#828282'
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