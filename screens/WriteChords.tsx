import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { VersionStackParamList, ChordLineType } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import Spinner from '../components/Spinner'

export default function WriteChords({ navigation, route }: StackScreenProps<VersionStackParamList, 'WriteChords'>) {
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState(version_sample);
  const [chords_lines, setChordsLines] = useState([]);
  const [selectedTone, selectTone] = useState('C');
  const [selectedCapo, setCapo] = useState(0);
  const [version_name, setVersionName] = useState('')
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {})
    return unsubscribe;
  }, [navigation])
  return (

    <View style={[styles.container]}>
      <ScrollView>
        <Spinner visible={loading} />
        <View>

          <Text style={styles.h1}>{version.music.name}</Text>
          <Text style={styles.h3}>{version.music.artist.name}</Text>

          <View style={{ marginTop: 25 }}>
            <TextInput
              placeholder="Nome da versão"
              style={{ flex: 1 }}
              onChangeText={(text) => setVersionName(text)}
            />
            <View style={[styles.separator, { marginBottom: 20 }]} />

            <Text style={styles.h2}> Tom </Text>
            <View style={styles.separator} />
            <View style={styles.tone_container}>
              {
                tone_lists.map((tones, i) => {
                  return (
                    <View style={styles.tone_buttons_container} key={i}>
                      {
                        tones.map((tone_name, j) => {
                          let idx = i * tones.length + j
                          return (
                            <TouchableOpacity
                              key={j}
                              style={[styles.circle_button, { backgroundColor: (selectedTone == tone_name ? '#2F80ED' : '#BDBDBD') }]}
                              onPress={() => {
                                selectTone(tone_name);
                              }}
                            >
                              <Text style={[styles.button_text, { color: '#FFFFFF' }]}>{tone_name}</Text>
                            </TouchableOpacity>
                          )
                        })
                      }
                    </View>
                  )
                })
              }
            </View>
            <TouchableOpacity
              style={[styles.button, { flexDirection: 'row', justifyContent: 'space-between' }]}
              onPress={() => {

              }}
            >
              <Text style={styles.button_text} > Capotraste </Text>
              <Text style={[styles.button_text, { color: '#2F80ED' }]} >
                {selectedCapo == 0 ? "Sem Capo" : `${selectedCapo}ª casa`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={styles.h2}> Cifra </Text>
          <View style={styles.separator} />
          {
            chords_lines.map((chord_line: ChordLineType, i) => {
              var line_empty = chord_line.music_line == '';
              return (
                <View key={i}>
                  <View
                    style={[
                      styles.input_container,
                      { marginTop: line_empty ? 20 : 0 }
                    ]}>
                    <TextInput
                      style={styles.chord_line}
                      autoCorrect={false}
                      defaultValue={chord_line.chords_line}

                    />
                  </View>
                  <Text style={styles.music_line}>{chord_line.music_line}</Text>
                </View>
              )
            })
          }
        </View>
        <TouchableOpacity style={styles.preview_button}>
          <Text style={[styles.button_text, { color: '#FFFFFF' }]}> Visualizar </Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    width: '100%',
    height: '100%'
  },
  h1: {
    color: '#333333',
    fontFamily: 'roboto-bold',
    fontSize: 18,
  },
  h2: {
    color: '#333333',
    fontFamily: 'roboto-bold',
    fontSize: 14,
  },
  h3: {
    color: '#828282',
    fontFamily: 'roboto',
    fontSize: 12,
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    marginTop: 10,
    marginBottom: 10,
  },
  tone_container: {
    padding: 15,
  },
  tone_buttons_container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  circle_button: {
    height: 35,
    width: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button_text: {
    fontFamily: 'roboto-bold',
    fontSize: 14,
    color: '#333333'
  },
  button: {
    width: '100%',
    borderRadius: 5,
    height: 45,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    marginTop: 10,
  },
  chord_line: {
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#2F80ED',

  },
  music_line: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#333333',
    flex: 1,
  },
  preview_button: {
    backgroundColor: '#2F80ED',
    height: 40,
    width: 160,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 5
  }
});

const tone_lists = [['C', 'C#', 'D', 'D#', 'E', 'F'], ['F#', 'G', 'G#', 'A', 'A#', 'B']]

const version_sample = {
  tone: 'C',
  capo: 0,
  name: '',
  author: {
    name: '',
    user: {
      username: ''
    }
  },
  music: {
    name: '',
    artist: {
      id: 0,
      name: '',
    }
  }
}

