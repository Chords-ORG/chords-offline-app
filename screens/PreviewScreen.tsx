import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfileStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

export default function SampleScreen({ navigation, route }: StackScreenProps<ProfileStackParamList, 'PreviewScreen'>) {
  console.log(route.params.chords_lines)
  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity 
          style={ styles.button_container }
          onPress={ ()=> navigation.navigate('WriteChord')}
        > 
          <Text style={styles.button_text}> Voltar </Text>
        </TouchableOpacity>
      </View>
      {
        route.params.lyric.split('\n').map( (line, i) => {
          var chord_line = route.params.chords_lines[i];
          return(
            <View key={i}>
              {
                chord_line && /\S/.test(chord_line) && 
                <TouchableOpacity> 
                  <Text style={styles.chord_text}> { chord_line }</Text>
                </TouchableOpacity>
              }
              <Text style={styles.lyric_text}>{ line } </Text>
            </View>
          );
        })
      }
      <View style={{height:50}}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding:20,
  },
  lyric_text:{
    fontSize:14,
    fontFamily:'monospace',
  },
  button_container:{
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'#2F80ED',
    width:100,
    height:30,
    margin: 20,
    borderRadius:5,
  },
  button_text:{
    color:'#F2F2F2',
    fontSize: 14,
    fontWeight:'bold',
    textAlign:'center',
  },
  chord_text:{
    color:'blue',
    fontSize:14,
    fontWeight:'bold',
    fontFamily:'monospace',
  },
});
