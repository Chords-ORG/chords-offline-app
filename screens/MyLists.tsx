import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { RootStackParamList, ProfileTabsParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';



export default function MyLists({ navigation }: StackScreenProps<ProfileTabsParamList>) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    })
    return unsubscribe;
  }, [navigation])
  return (
    <View style={[styles.container, {}]}>
      <Text style={styles.h1}> Minhas listas </Text>
      <View style={styles.separator} />
      <View>
        <ScrollView>
          {
            lists.map((list, i) => {
              return (
                <TouchableOpacity style={styles.card} key={i}>
                  <Text style={styles.card_h1}>{list.name}</Text>
                  <Text style={styles.card_h2}>{`${list.tam} cifras`}</Text>
                </TouchableOpacity>
              )
            })
          }
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.floating_button}>
        <Image
          source={require('../assets/images/new_list_icon.png')}
          style={styles.icon}
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
    height: 60,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    justifyContent: 'center'
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
  icon: {
    height: 30,
    width: 30,
  }
});

const lists = [
  {
    name: 'Igreja',
    tam: 12
  },
  {
    name: 'Quarentena',
    tam: 15,
  }
]