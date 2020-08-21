import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Alert, Animated, ActivityIndicator } from 'react-native';
import { RootStackParamList, ChordLineType } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import Drawer from 'react-native-drawer-menu';
import { Easing } from 'react-native';
import Navigation from '../navigation';
import { addToChordLines, numberToNote, noteToNumber, Chord, LoadChords } from '../functions/chords'
import Spinner from '../components/Spinner';
import { getItem } from '../functions/storage'
import CapoDialog from '../components/CapoDialog'
import GuitarChord from '../components/GuitarChord'
import { get_chords_lines, get_version, get_rate_version, like_version, unlike_version } from '../functions/requests'
import useFloatingHeaderHeight from '@react-navigation/stack/lib/typescript/src/utils/useHeaderHeight';

export default function ChordScreen({ navigation, route }: StackScreenProps<RootStackParamList, 'ChordScreen'>) {
  const up_arrow = require('../assets/images/up_arrow.png');
  const down_arrow = require('../assets/images/down_arrow.png');
  const like_gray = require('../assets/images/like_icon_gray.png')
  const like_green = require('../assets/images/like_icon_green.png')
  const unlike_gray = require('../assets/images/unlike_icon_gray.png')
  const unlike_red = require('../assets/images/unlike_icon_red.png')

  const [loading, setLoading] = useState(false)
  const [showChords, setShowChords] = useState(true)
  const [drawer, setDrawner] = useState(drawner_holder)
  const [selectedTone, selectTone] = useState('C');
  const [selectedCapo, selectCapo] = useState(0);
  const [version, setVersion] = useState(version_sample)
  const [chords_lines, setChordsLines] = useState([])
  const [dialog_visible, setDialogVisible] = useState(false);
  const [chords_positions, setChordsPositions] = useState(new Set<string>())
  const [rate_type, setRateType] = useState('none')
  const [like_loading, setLikeLoading] = useState(false)
  const [dict, setDictType] = useState('sharp');
  const [instrument, setInstrument] = useState('guitar');


  const load_data = async (chord_id: number) => {
    drawer.closeDrawer();
    setDialogVisible(false);
    setLoading(true);
    const dict = await getItem('dict');
    const instrument = await getItem('instrument');
    const version = await get_version(chord_id);
    const chords_lines = await get_chords_lines(chord_id);
    const default_capo = await getItem('default_capo');
    if (dict) setDictType(dict);
    if (instrument) setInstrument(instrument);
    setVersion(version);
    selectTone(version.tone);
    if (default_capo == 'auto') {
      selectCapo(version.capo);
    }
    else {
      setChordsLines(addToChordLines(chords_lines, -version.capo, dict));
    }
    setChordsPositions(LoadChords(chords_lines));
    setChordsLines(chords_lines);
    setLoading(false);
  }
  const getNote = (tone: string) => {
    return dict == 'sharp' ? new Chord(tone).toSharp() : new Chord(tone).toBemol();
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      load_data(route.params.chord_id).catch(error => {
        setLoading(false);
        Alert.alert(error.title, error.message);
      })
    })
    return unsubscribe;
  }, [navigation])

  const drawerContent = (
    <Animated.View>
      <View style={drawner_styles.header}>
        <Text style={drawner_styles.title}> Opções </Text>
      </View>
      <View style={drawner_styles.container}>
        <ScrollView>
          {true ? null :
            <View style={[drawner_styles.sub_header, { marginTop: 0 }]}>
              <Text style={drawner_styles.h1}> Cifra </Text>
              <View style={drawner_styles.separator} />
            </View>
          }
          {true ? null :
            <TouchableOpacity
              style={drawner_styles.button}
            >
              <Image
                style={drawner_styles.icon}
                source={require('../assets/images/save_icon.png')}
              />
              <Text style={drawner_styles.button_text}> Salvar Cifra </Text>
            </TouchableOpacity>
          }
          {true ? null :
            <TouchableOpacity
              style={drawner_styles.button}
              onPress={() => {
                //navigation.navigate('VersionStack', { screen: 'WriteChords', params: { version_id: version.id } })
              }}
            >
              <Image
                style={drawner_styles.icon}
                source={require('../assets/images/pencil_icon.png')}
              />
              <Text style={drawner_styles.button_text}> Criar cifra a partir dessa </Text>
            </TouchableOpacity>
          }
          <View style={drawner_styles.sub_header}>
            <Text style={drawner_styles.h1}> Tom </Text>
            <View style={drawner_styles.separator} />
          </View>
          <View>
            {
              tone_lists.map((tones, i) => {
                return (
                  <View style={drawner_styles.tone_buttons_container} key={i}>
                    {
                      tones.map((tone_name, j) => {
                        let idx = i * tones.length + j
                        return (
                          <TouchableOpacity
                            key={j}
                            style={[drawner_styles.circle_button, { backgroundColor: (noteToNumber(selectedTone) == idx ? '#2F80ED' : '#BDBDBD') }]}
                            onPress={() => {
                              let delta = idx - noteToNumber(selectedTone)
                              setChordsLines(addToChordLines(chords_lines, delta, dict));
                              var chord = new Chord(selectedTone);
                              chord.add(delta)
                              selectTone(dict == 'sharp' ? chord.toSharp() : chord.toBemol());
                              setChordsPositions(LoadChords(chords_lines));
                              drawer.closeDrawer();

                            }}
                          >
                            <Text style={[drawner_styles.button_text, { color: '#FFFFFF' }]}>{tone_name}</Text>
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
            style={[drawner_styles.button, { flexDirection: 'row', justifyContent: 'space-between' }]}
            onPress={() => {
              setDialogVisible(true);
            }}
          >
            <Text style={drawner_styles.button_text} > Capotraste </Text>
            <Text style={[drawner_styles.button_text, { color: '#2F80ED' }]} >
              {selectedCapo == 0 ? "Sem Capo" : `${selectedCapo}ª casa`}
            </Text>
          </TouchableOpacity>

          <View style={drawner_styles.sub_header}>
            <Text style={drawner_styles.h1}> Informações </Text>
            <View style={drawner_styles.separator} />
          </View>

          <TouchableOpacity
            style={[drawner_styles.button, { flexDirection: 'row', justifyContent: 'space-between' }]}
            onPress={() => {
              navigation.navigate('ArtistScreen', { artist_id: version.music.artist.id })
            }}
          >
            <Text style={drawner_styles.button_text} > Artista </Text>
            <Text style={[drawner_styles.button_text, { color: '#2F80ED' }]} >{version.music.artist.name}</Text>
          </TouchableOpacity>
          {true ? null :
            <TouchableOpacity
              style={[drawner_styles.button, { flexDirection: 'row', justifyContent: 'space-between' }]}
              onPress={() => {
                navigation.navigate('ProfileScreen', { username: version.author.user.username })
              }}
            >
              <Text style={drawner_styles.button_text} > Autor da cifra </Text>
              <Text style={[drawner_styles.button_text, { color: '#2F80ED' }]} > {`@${version.author.user.username}`} </Text>
            </TouchableOpacity>
          }
          {true ? null :
            <View style={drawner_styles.sub_header}>
              <Text style={drawner_styles.h1}> Avalie a cifra </Text>
              <View style={drawner_styles.separator} />
            </View>
          }
          {
            true ? null :
              <View style={drawner_styles.rate_container}>

                <TouchableOpacity
                  onPress={() => {
                    setLikeLoading(true);
                    like_version(route.params.chord_id).then(() => {
                      get_rate_version(route.params.chord_id).then(response => {
                        setRateType('none')
                        if (response.rate_type)
                          setRateType(response.rate_type);
                        setLikeLoading(false);
                      })
                    }).catch(error => {
                      setLikeLoading(false);
                      Alert.alert(error.title, error.message);
                    })
                  }}
                >
                  <Image
                    source={rate_type == 'like' ? like_green : like_gray}
                    style={drawner_styles.like_icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLikeLoading(true);
                    unlike_version(route.params.chord_id).then(() => {
                      get_rate_version(route.params.chord_id).then(response => {
                        setRateType('none')
                        if (response.rate_type)
                          setRateType(response.rate_type);
                        setLikeLoading(false);
                      })
                    }).catch(error => {
                      setLikeLoading(false);
                      Alert.alert(error.title, error.message);
                    })
                  }}
                >
                  <Image
                    source={rate_type == 'unlike' ? unlike_red : unlike_gray}
                    style={drawner_styles.like_icon}
                  />
                </TouchableOpacity>
              </View>
          }
        </ScrollView>
      </View>
    </Animated.View>
  )

  return (
    <Drawer
      drawerWidth={300}
      easingFunc={Easing.ease}
      ref={(drawer: any) => setDrawner(drawer)}
      drawerPosition={Drawer.positions.Right}
      drawerContent={drawerContent}
    >
      <Spinner visible={loading} />
      <CapoDialog
        visible={dialog_visible}
        closeDialog={() => setDialogVisible(false)}
        selected_capo={selectedCapo}
        tone={selectedTone}
        onSelect={(value, delta) => {
          setChordsLines(addToChordLines(chords_lines, delta, dict));
          selectCapo(value);
          setChordsPositions(LoadChords(chords_lines));
          setDialogVisible(false);
          drawer.closeDrawer();
        }}
      />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              style={styles.icon}
              source={require('../assets/images/back_icon.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.logo}
            source={require('../assets/images/app_logo.png')}
          />
          <Text style={styles.title}> Chords </Text>
        </View>
        <TouchableOpacity onPress={drawer.openDrawer} style={styles.options_button}>
          <Image
            style={styles.icon}
            source={require('../assets/images/menu_icon.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.container, { padding: 15, width: '100%', height: '100%' }]}>
        {showChords &&
          <View style={styles.chords_container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                Array.from(chords_positions).map((chord_name) => (
                  <View key={chord_name} style={styles.chord_container}>
                    {instrument == 'guitar' ?
                      <GuitarChord
                        Capo={selectedCapo}
                        ChordName={chord_name}
                      /> : null
                    }
                    {instrument == 'piano' ?
                      null: null
                    }
                    <Text style={styles.chord_name}> {getNote(chord_name)} </Text>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        }
        <TouchableOpacity
          onPress={() => setShowChords(!showChords)}
          style={styles.arrow_container}
        >
          <Image
            style={styles.arrow_icon}
            source={(showChords ? up_arrow : down_arrow)}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.header_container}>
              <View style={styles.left}>
                <Text style={styles.h1}>{version.music.name}</Text>
                <Text style={styles.h2}>{version.music.artist.name}</Text>
              </View>
            </View>
            <View style={styles.tone_container}>
              <TouchableOpacity
                onPress={() => {
                  drawer.openDrawer()
                }}
              >
                <Text style={styles.tone_text}>Tom: <Text style={{ color: '#2F80ED' }}>
                  {getNote(selectedTone)}
                </Text></Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDialogVisible(true);
                }}
              >
                <Text style={styles.tone_text}>Capotraste: <Text style={{ color: '#2F80ED' }}>{selectedCapo == 0 ? "Sem Capo" : `${selectedCapo}ª casa`} </Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              {
                chords_lines.map((chord_line: ChordLineType, i) => (
                  <View key={i}>
                    {
                      chord_line.chords_line == '' ? null :
                        <Text style={styles.chord_font}>{chord_line.chords_line}</Text>
                    }
                    <Text style={styles.lyric_font}>{chord_line.music_line.line}</Text>
                  </View>
                ))
              }
            </View>
            <View style={{ height: 300 }} />
          </ScrollView>
        </View>
      </View>
    </Drawer>
  );
}

const tone_lists = [['C', 'C#', 'D', 'D#', 'E', 'F'], ['F#', 'G', 'G#', 'A', 'A#', 'B']]

const chord_list = ['C#m7', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C']

const version_sample = {
  id: 1,
  tone: 'C',
  capo: 1,
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
      id: 4,
      name: '',
    }
  }
}

const chords_lines_sample = [
  {
    chord_line: "",
    music_line: {
      line: "Hey, leave a message",
    }
  },
  {
    chord_line: "C",
    music_line: {
      line: "Hey, call me back",
    }
  },
  {
    chord_line: "         Am    ",
    music_line: {
      line: "When you get this",
    }
  },
  {
    chord_line: "                     F    ",
    music_line: {
      line: "Or when you've got a minute",
    }
  },
  {
    chord_line: "               C      G    ",
    music_line: {
      line: "We really need to talk",
    }
  },
  {
    chord_line: " C    ",
    music_line: {
      line: "Wait, you know what",
    }
  },
  {
    chord_line: "               Am       ",
    music_line: {
      line: "Maybe just forget it",
    }
  },
  {
    chord_line: "                      F    ",
    music_line: {
      line: "Cause by the time you get this",
    }
  },
  {
    chord_line: "                  C         G    ",
    music_line: {
      line: "Your number might be blocked",
    }
  },
  {
    chord_line: "",
    music_line: {
      line: "",
    }
  },
  {
    chord_line: " Am                C           ",
    music_line: {
      line: "Stay and blah blah blah",
    }
  },
  {
    chord_line: "         F                       C  G    ",
    music_line: {
      line: "You just want what you can't have",
    }
  },
  {
    chord_line: " Am                    C    ",
    music_line: {
      line: "No wait, I'll call the cops",
    }
  },
  {
    chord_line: "             F                       C G",
    music_line: {
      line: "If you don't stop I'll call your dad      ",
    }
  },
  {
    chord_line: "",
    music_line: {
      line: "",
    }
  },
  {
    chord_line: "       F              G              C    ",
    music_line: {
      line: "And I hate to do this to you on your birthday      ",
    }
  },
  {
    chord_line: "      Am              E7    ",
    music_line: {
      line: "Happy birthday by the way      ",
    }
  },
  {
    chord_line: "         F               G              C    ",
    music_line: {
      line: "It's not you it's me and all that other bullshit      ",
    }
  },
  {
    chord_line: "        Am",
    music_line: {
      line: "You know that's bullshit      ",
    }
  },
  {
    chord_line: "       E7        F    ",
    music_line: {
      line: "Don't you, babe       ",
    }
  },
  {
    chord_line: "             Fm       C    ",
    music_line: {
      line: "I'm not your party favor      ",
    }
  },
  {
    chord_line: "",
    music_line: {
      line: "",
    }
  },
  {
    chord_line: "",
    music_line: {
      line: "",
    }
  },
  {
    chord_line: "",
    music_line: {
      line: "",
    }
  },
  {
    chord_line: "",
    music_line: {
      line: "",
    }
  },
  {
    chord_line: "",
    music_line: {
      line: "",
    }
  },
  {
    chord_line: "",
    music_line: {
      line: "",
    }
  }
]
const drawner_holder = {
  openDrawer: () => null,
  closeDrawer: () => null,
}

const drawner_styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 10,
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
    //borderBottomWidth:1,
  },
  title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'raleway'
  },
  h1: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#333333'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    width: '100%',
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
  icon: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  sub_header: {
    marginBottom: 10,
    marginTop: 30,
  },
  tone_buttons_container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  rate_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  like_icon: {
    height: 40,
    width: 40,
    margin: 10,
  }
})
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
    //borderBottomWidth:1,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'raleway'
  },
  chords_container: {
    flexDirection: 'row',
    paddingBottom: 10,
    //height: 170,
  },
  arrow_icon: {
    height: 13,
    width: 20,
    alignSelf: 'center',
  },
  chord_image: {
    height: 120,
    width: 80,
  },
  chord_container: {
    alignItems: 'center',
    marginRight: 20,
  },
  chord_image_container: {
    flexDirection: 'row'
  },
  house_indicator: {
    fontFamily: 'roboto-bold',
    fontSize: 10,
    paddingTop: 30,
  },
  chord_name: {
    fontFamily: 'roboto-bold',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 5,
    color: '#333333'
  },
  arrow_container: {
    width: '100%',
    height: 25,
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1,
  },
  h1: {
    fontFamily: 'roboto-bold',
    fontSize: 18,
    color: '#333333'
  },
  h2: {
    fontFamily: 'roboto',
    fontSize: 14,
    color: '#828282'
  },
  left: {
    flex: 2
  },
  right: {
    flex: 1
  },
  header_container: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  options_button: {
    alignSelf: 'center',
  },
  options_text: {
    fontFamily: 'roboto-bold',
    fontSize: 12,
    color: '#F2F2F2'
  },
  tone_container: {
    paddingTop: 20,
  },
  tone_text: {
    fontFamily: 'roboto-bold',
    fontSize: 14,
    color: '#333333'
  },
  drawer: {

  },
  chord_font: {
    color: '#2F80ED',
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold'
  },
  lyric_font: {
    color: '#333333',
    fontFamily: 'monospace',
    fontSize: 14,
  }

});