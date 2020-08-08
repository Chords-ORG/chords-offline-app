import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SearchStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

// 
export default function VersionScreen({ navigation }: StackScreenProps<SearchStackParamList, 'ChoseVersion'>) {
  return (
    <View style={[styles.container, { width: '100%', height: '100%', padding: 15 }]}>
      <ScrollView>
        <TouchableOpacity style={styles.card}>
          <Image
            style={styles.icon_30}
            source={require('../assets/images/paper_icon.png')}
          />
          <Text style={styles.card_h1}> Apenas a Letra </Text>
        </TouchableOpacity>
        {
          chords_versions.map((version, i) => {
            return (
              <TouchableOpacity key={i} style={styles.card}>
                <View style={styles.left}>
                  <Text style={styles.card_h1}>{version.name}</Text>
                  <Text style={styles.card_h2}> Escrito por <Text style={{color:'#2F80ED'}}>{`@${version.author.username}`}</Text></Text>
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
    marginTop:10,
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

const chords_versions = [
  {
    name: 'Original',
    author: {
      username: 'fulano'
    },
    likes: 255,
    unlikes: 12,
  },
  {
    name: 'Simplificada',
    author: {
      username: 'gustavolima00'
    },
    likes: 12,
    unlikes: 1,
  },
]