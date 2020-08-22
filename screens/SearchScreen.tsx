import React, { useState, useEffect, version } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SearchStackParamList, MusicType, VersionType, RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { search_music } from '../functions/requests'
import { getItemObject, setItemObject } from '../functions/storage'

export default function SearchScreen({ navigation }: StackScreenProps<RootStackParamList>) {
  const [loading, setLoading] = useState(false);
  const [music_results, setMusics] = useState([]);
  const [search, setSearch] = useState('');
  const [idle, setIdle] = useState(true);
  const [cache_versions, setCacheVersions] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getItemObject('cache@versions', []).then(versions => {
        setCacheVersions(versions.reverse());
        setLoading(false);
      })
    });
    return unsubscribe;
  }, [navigation])
  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <View style={styles.header}>
        <Image
          style={styles.icon}
          source={require('../assets/images/search_icon.png')}
        />
        <TextInput
          style={styles.text_input}
          value={search}
          onEndEditing={() => {
            setLoading(true);
            setIdle(false);
            search_music(search).then(results => {
              setLoading(false);
              setMusics(results);
            }).catch(error => {
              setLoading(false);
              Alert.alert(error.title, error.message)
            })
          }}
          onChangeText={(text) => {
            setSearch(text);
            if (text == '') setIdle(true);
          }}
          placeholder="Buscar"
          maxLength={40}
        />
        {search == '' ? null :
          <TouchableOpacity
            style={styles.cancel_box}
            onPress={() => {
              setSearch('');
              setIdle(true);
            }}
          >
            <Image
              style={styles.cancel_icon}
              source={require('../assets/images/none_string.png')}
            />
          </TouchableOpacity>
        }
      </View>
      <ScrollView style={[styles.container, { padding: 15 }]}>
        {
          !loading && idle ?
            (
              <View style={styles.memory_container}>
                <View style={styles.cache_header}>
                  <Text style={styles.h1}> Cifras acessadas recentemente </Text>
                  <TouchableOpacity
                    style={styles.memory_container}
                    onPress={() => {
                      setLoading(true);
                      setItemObject('cache@versions', []).then(() => {
                        setCacheVersions([]);
                        setLoading(false);
                      }).catch(error => {
                        setLoading(false);
                        Alert.alert(error.title, error.message);
                      })
                    }}
                  >
                    <Text style={styles.card_h3}> Limpar </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                {
                  cache_versions.map((version: VersionType, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={styles.chord_card}
                        onPress={() => {
                          navigation.push('ChordScreen', { chord_id: version.id })
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
                    )
                  })
                }
              </View>
            ) :
            (
              loading ? <ActivityIndicator /> :
                (music_results.length == 0 ?
                  <View style={styles.no_results_container}>
                    <Text style={styles.no_results_text}> Não foram encotrados resultados para sua busca </Text>
                  </View> :
                  music_results.map((music: MusicType, i) => {
                    return (
                      <TouchableOpacity
                        style={styles.card}
                        key={i}
                        onPress={() => navigation.push('Root', { screen: 'Search', params: { screen: 'ChoseVersion', params: { music_id: music.id } } })}
                      >
                        <Text style={styles.card_h1}>{music.name}</Text>
                        <Text style={styles.card_h2}>{music.artist.name}</Text>
                      </TouchableOpacity>
                    );
                  })
                )
            )
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
    flex: 1,
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
  card_h3: {
    fontSize: 12,
    fontFamily: 'roboto',
    color: '#2F80ED'
  },
  cancel_box: {
    paddingRight: 10
  },
  cancel_icon: {
    height: 20,
    width: 20,
  },
  no_results_container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  no_results_text: {
    fontSize: 14,
    fontFamily: 'roboto',
    color: '#333333',
    textAlign: 'center'
  },
  memory_container: {

  },
  h1: {
    fontSize: 14,
    fontFamily: 'roboto-bold',
    color: '#333333',
  },
  separator: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1,
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
    flex: 1
  },
  right: {
    flex: 1,
  },
  vertical_separator: {
    height: '100%',
    borderLeftColor: '#E4E4E4',
    borderLeftWidth: 1,
    marginRight: 10,
    marginLeft: 10
  },
  cache_header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
