import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';



export default function SampleScreen({ navigation }: StackScreenProps<RootStackParamList>) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    })
    return unsubscribe;
  }, [navigation])
  return (
    <View style={[styles.container, {}]}>

      <Text style={styles.h1}> Minhas cifras </Text>
      <View style={styles.separator} />
      <View>
        <ScrollView>
          {
            my_chords.map((version, i) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={i}
                  onPress={() => {
                    navigation.navigate('ChordScreen', { chord_id: version.id })
                  }}
                >
                  <View style={styles.left}>
                    <Text style={styles.card_h1}>Versão: {version.name}</Text>
                    <Text style={styles.card_h2}>{version.music.name}</Text>
                  </View>
                  <View style={styles.right}>
                    <View style={styles.like_container}>
                      <Image
                        style={styles.like_icon}
                        source={require('../assets/images/like_icon_green.png')}
                      />
                      <Text style={[styles.like_count,]}>{version.likes}</Text>
                    </View>
                    <View style={styles.like_container}>
                      <Image
                        style={styles.like_icon}
                        source={require('../assets/images/unlike_icon_red.png')}
                      />
                      <Text style={[styles.like_count, { color: '#EB5757' }]}>{version.unlikes}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.floating_button}>
        <Image
          source={require('../assets/images/pencil_plus_icon.png')}
          style={styles.pencil_icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  h1: {
    fontFamily: 'roboto-bold',
    color: '#333333',
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#E4E4E4',
    height: 10,
  },
  card: {
    backgroundColor: '#F2F2F2',
    height: 65,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card_h1: {
    color: '#333333',
    fontFamily: 'roboto-bold',
    fontSize: 14,
  },
  card_h2: {
    color: '#828282',
    fontFamily: 'roboto',
    fontSize: 12,
  },
  like_container: {
    margin: 5,
  },
  like_count: {
    fontSize: 12,
    fontFamily: 'roboto',
    color: '#6FCF97',
    textAlign: 'center'
  },
  like_icon: {
    height: 30,
    width: 30
  },
  left: {
  },
  right: {
    flexDirection: 'row',
  },
  floating_button: {
    height: 55,
    width: 55,
    borderRadius: 30,
    backgroundColor: '#2F80ED',
    position: 'absolute',
    right: 30,
    bottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pencil_icon: {
    height: 30,
    width: 30,
  }
});

const my_chords = [
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  },
  {
    id: 12,
    name: 'Simplificada',
    author: {
      name: 'fulano',
      user: {
        username: 'fulano',
      }
    },
    music: {
      artist: {
        name: 'Gabriela Rocha',
      },
      name: 'Creio que tu és a cura'
    },
    view_mode: 'public',
    likes: 20,
    unlikes: 25,
  }
]