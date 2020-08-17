import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView
} from 'react-native';
import { RootStackParamList, ArtistType, MusicType, VersionType } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { get_other_profile, get_artist_musics } from '../functions/requests'
import { ScrollView } from 'react-native-gesture-handler';

export default function ProfileScreen({ navigation, route }: StackScreenProps<RootStackParamList, 'ProfileScreen'>) {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      get_other_profile(route.params.username).then((profile)=>{
        setProfile(profile);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        Alert.alert(error.title, error.message)
      })
      
    })
    return unsubscribe;
  }, [navigation])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(sample_profile)
  const [versions, setVersions] = useState([])


  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              style={styles.back_icon}
              source={require('../assets/images/back_icon.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.app_logo}
            source={require('../assets/images/app_logo.png')}
          />
          <Text style={styles.header_title}> Chords </Text>
        </View>
      </View>
      {
        loading ? <ActivityIndicator size="large" /> :
          <View style={[styles.container, { padding: 15 }]}>
            <View style={[styles.container, { flexDirection: 'row' }]}>
              <Image
                source={{ uri: profile.photo_url }}
                style={styles.profile_photo}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.h2}>{profile.name}</Text>
                <Text style={styles.h3}>{`@${profile.user.username}`}</Text>
              </View>
            </View>
            <View style={styles.sub_header}>
              <Text style={styles.h2}> Cifras </Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.musics_container}>
              <ScrollView>
                {
                  versions.map((version: VersionType, i) => {
                    return (
                      <TouchableOpacity style={styles.card} key={i}>
                        <View style={styles.left}>
                        </View>
                        <View style={styles.right}>
                          <View style={styles.like_container}>
                            <Image
                              style={styles.like_icon}
                            />
                            <Text style={styles.like_text}>{version.likes}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
                <View style={{ height: 300 }} />
              </ScrollView>
            </View>
          </View>
      }
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
    justifyContent: 'space-between',
  },
  back_icon: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  header_title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'raleway'
  },
  app_logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  profile_photo: {
    height: 50,
    width: 50,
  },
  h1: {
    color: '#333333',
    fontSize: 24,
    fontFamily: 'roboto-bold',
  },
  h2: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'roboto-bold',
  },
  h3: {
    color: '#828282',
    fontSize: 12,
    fontFamily: 'roboto',
  },
  sub_header: {
    marginTop: 20,
  },
  separator: {
    width: '100%',
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  musics_container: {
    height: '100%',
  },
  card: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
  card_h1: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'roboto-bold',
  },
  left:{

  },
  right:{
    
  },
  like_container:{

  },
  like_icon:{
    height:25,
    width:25,
  },
  like_text:{
    color:'#6FCF97',
    fontFamily:'roboto',
    fontSize:10
  }
});

const sample_profile = {
  name: "",
  photo_url: "",
  user: {
    username: "",
    email: "",
  }
}
