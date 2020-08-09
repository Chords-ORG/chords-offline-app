import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Alert } from 'react-native';
import { SearchStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import Drawer from 'react-native-drawer-menu';
import { Easing } from 'react-native';
import Navigation from '../navigation';

export default function ChordScreen({ navigation }: StackScreenProps<SearchStackParamList, 'ChordScreen'>) {
  const up_arrow = require('../assets/images/up_arrow.png');
  const down_arrow = require('../assets/images/down_arrow.png');
  const like_gray = require('../assets/images/like_icon_gray.png')
  const like_green = require('../assets/images/like_icon_green.png')
  const unlike_gray = require('../assets/images/unlike_icon_gray.png')
  const unlike_red = require('../assets/images/unlike_icon_red.png')

  const [loading, setLoading] = useState(false)
  const [showChords, setShowChords] = useState(true)
  const [drawer, setDrawner] = useState(drawner_holder)

  const drawerContent = (
    <View>
      <View style={drawner_styles.header}>
        <Text style={drawner_styles.title}> Opções </Text>
      </View>
      <View style={drawner_styles.container}>
        <ScrollView>
          <View style={[drawner_styles.sub_header, { marginTop: 0 }]}>
            <Text style={drawner_styles.h1}> Cifra </Text>
            <View style={drawner_styles.separator} />
          </View>

          <TouchableOpacity
            style={drawner_styles.button}
            onPress={saveChords}
          >
            <Image
              style={drawner_styles.icon}
              source={require('../assets/images/save_icon.png')}
            />
            <Text style={drawner_styles.button_text}> Salvar Cifra </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={drawner_styles.button}
          >
            <Image
              style={drawner_styles.icon}
              source={require('../assets/images/pencil_icon.png')}
            />
            <Text style={drawner_styles.button_text}> Criar cifra a partir dessa </Text>
          </TouchableOpacity>

          <View style={drawner_styles.sub_header}>
            <Text style={drawner_styles.h1}> Tom </Text>
            <View style={drawner_styles.separator} />
          </View>
          <View style={[drawner_styles.tone_buttons_container, { marginTop: 20 }]}>
            {
              top_tones.map((tone_name, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[drawner_styles.circle_button, { backgroundColor: (false ? '#2F80ED' : '#BDBDBD') }]}
                  >
                    <Text style={[drawner_styles.button_text, { color: '#FFFFFF' }]}>{tone_name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <View style={drawner_styles.tone_buttons_container}>
            {
              bottom_tones.map((tone_name, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[drawner_styles.circle_button, { backgroundColor: (false ? '#2F80ED' : '#BDBDBD') }]}
                  >
                    <Text style={[drawner_styles.button_text, { color: '#FFFFFF' }]}>{tone_name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <TouchableOpacity style={[drawner_styles.button, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={drawner_styles.button_text} > Capotraste </Text>
            <Text style={[drawner_styles.button_text, { color: '#2F80EDs' }]} > Sem Capo </Text>
          </TouchableOpacity>

          <View style={drawner_styles.sub_header}>
            <Text style={drawner_styles.h1}> Informações </Text>
            <View style={drawner_styles.separator} />
          </View>

          <TouchableOpacity style={[drawner_styles.button, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={drawner_styles.button_text} > Artista </Text>
            <Text style={[drawner_styles.button_text, { color: '#2F80ED' }]} > Artista desconhecido </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[drawner_styles.button, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={drawner_styles.button_text} > Autor da cifra </Text>
            <Text style={[drawner_styles.button_text, { color: '#2F80ED' }]} > @gustavolima00 </Text>
          </TouchableOpacity>

          <View style={drawner_styles.sub_header}>
            <Text style={drawner_styles.h1}> Avalie a cifra </Text>
            <View style={drawner_styles.separator} />
          </View>

          <View style={drawner_styles.rate_container}>
            <TouchableOpacity>
              <Image
                source={like_gray}
                style={drawner_styles.like_icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={unlike_gray}
                style={drawner_styles.like_icon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )

  return (
    <Drawer
      drawerWidth={300}
      easingFunc={Easing.ease}
      ref={(drawer: any) => setDrawner(drawer)}
      drawerPosition={Drawer.positions.Right}
      drawerContent={drawerContent}
    >
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
      <View style={[styles.container, { padding: 15 }]}>
        {showChords &&
          <View style={styles.chords_container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                chord_list.map((chord_name, i) => (
                  <View key={i} style={styles.chord_container}>
                    <View style={styles.chord_image_container}>
                      <Text style={styles.house_indicator}> {(true ? `${12}ª` : '')} </Text>
                      <Image
                        style={styles.chord_image}
                        source={require(`../assets/guitar_chords/front/C.png`)}
                      />
                    </View>
                    <Text style={styles.chord_name}> {chord_name} </Text>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        }
        <TouchableOpacity
          onPress={() => setShowChords(!showChords)}
          style={{ width: '100%', height: 30 }}
        >
          <Image
            style={styles.arrow_icon}
            source={(showChords ? up_arrow : down_arrow)}
          />
        </TouchableOpacity>
        <View style={[styles.container, { paddingTop: 10 }]}>
          <ScrollView>
            <View style={styles.header_container}>
              <View style={styles.left}>
                <Text style={styles.h1}> Parabéns pra você </Text>
                <Text style={styles.h2}> Artista Desconhecido </Text>
              </View>
            </View>
            <View style={styles.tone_container}>
              <TouchableOpacity>
                <Text style={styles.tone_text}>Tom: <Text style={{ color: '#2F80ED' }}>{'G'}</Text></Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.tone_text}>Capotraste: <Text style={{ color: '#2F80ED' }}>{'Sem capotraste'}</Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 1000 }}>
            </View>
          </ScrollView>
        </View>
      </View>
    </Drawer>
  );
}

function saveChords() {
  Alert.alert('Save Chords', 'Salvar cifra foi pressionado')
}
const top_tones = ['C', 'C#', 'D', 'D#', 'E', 'F']
const bottom_tones = ['F#', 'G', 'G#', 'A', 'A#', 'B']


const drawner_holder = {
  openDrawer: () => null,
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
    height: 170,
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
    paddingLeft: 20,
    paddingTop: 5,
    color: '#333333'
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

});



const chord_list = ['C#m7', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'] 