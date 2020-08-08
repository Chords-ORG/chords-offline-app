import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ProfileStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput, ScrollView } from 'react-native-gesture-handler';


export default function SampleScreen({ navigation, route }: StackScreenProps<ProfileStackParamList, 'PreviewScreen'>) {
  const up_arrow = require('../assets/images/up_arrow.png')
  const down_arrow = require('../assets/images/down_arrow.png')
  const like_gray = require('../assets/images/like_gray.png')
  const deslike_gray = require('../assets/images/deslike_gray.png')

  const [show_menu, setMenu] = useState(true);

  return (
    <ScrollView style={[styles.container, { padding: 10 }]}>
      {show_menu &&
        <View style={{ alignItems: 'center', paddingBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.option_container}>
              <Text style={styles.label}> Capotraste </Text>
              <TouchableOpacity
                style={styles.button_container}
              >
                <Text style={styles.button_text}> Sem capotraste </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option_container}>
              <Text style={styles.label}> Tom </Text>
              <TouchableOpacity
                style={styles.button_container}
              >
                <Text style={styles.button_text}> G </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.option_container}>
              <Text style={styles.label}> Artista </Text>
              <TouchableOpacity
                style={styles.button_container}
              >
                <Text style={styles.button_text}> Artista desconhecido </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option_container}>
              <Text style={styles.label}> Escrita por </Text>
              <TouchableOpacity
                style={styles.button_container}
              >
                <Text style={styles.button_text}> @gustavolima00 </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={styles.label}> Avalie a cifra </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity>
                <Image
                  style={styles.like_icon}
                  source={like_gray}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.like_icon}
                  source={deslike_gray}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
      <TouchableOpacity
        style={[styles.container, { alignItems: 'center', paddingBottom: 20 }]}
        onPress={() => setMenu(!show_menu)}
      >
        <Image
          style={styles.arrow}
          source={(show_menu ? up_arrow : down_arrow)}
        />
      </TouchableOpacity>
      {
        route.params.lyric.split('\n').map((line, i) => {
          var chord_line = route.params.chords_lines[i];
          return (
            <View key={i}>
              {
                chord_line && /\S/.test(chord_line) &&
                <TouchableOpacity>
                  <Text style={styles.chord_text}> {chord_line}</Text>
                </TouchableOpacity>
              }
              <Text style={styles.lyric_text}>{line} </Text>
            </View>
          );
        })
      }
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  lyric_text: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  option_container: {
    marginRight: 20,
  },
  label: {
    fontSize: 14,
  },
  button_container: {
    justifyContent: 'center',
    backgroundColor: '#2F80ED',
    width: 120,
    height: 40,
    borderRadius: 5,
    marginTop: 2,
  },
  button_text: {
    color: '#F2F2F2',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chord_text: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#828282',    
  },
  arrow: {
    height: 13,
    width: 20,
    marginTop: 5,
  },
  like_icon: {
    height: 30,
    width: 30,
    marginRight: 20,
    marginTop: 10
  }
});
