import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfileStackParamList, defaultDict } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

const lyric = "Leva-me além do que já pude sentir.\nAtraído eu quero ser \npor Tua Glória e por teu Amor.\n\nEsvazio de mim mesmo \nEnche-me com Teu poder\nQuero ser um instrumento \nUm vaso em Tuas mãos Senhor.\nTu sabes que eu preciso que me ames \npois minha esperança está em Ti,\nMeu Rei e meu Senhor, \nreine sobre mim.\n\nClamo a Ti, Senhor vem depressa,\nsuplico misericórdia,\nrasgo minhas vestes e \napresento minha dor.\nBendito é o Cordeiro, \nos céus proclamam sua Glória, o \nUniverso Prostado adora ao Criador.\n\nTrazes o nascer do Sol. \nconcede o brilho as estrelas,\nTudo que tem fôlego, louve ao Senhor."
const default_text = "                                        "

export default function SampleScreen({ navigation }: StackScreenProps<ProfileStackParamList, 'WriteChord'>) {
  const [chords_lines, setChordsLines] = useState({});
  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity 
          style={ styles.button_container }
          onPress={ ()=> navigation.push('PreviewScreen', { lyric:lyric, chords_lines:chords_lines })}
        > 
          <Text style={styles.button_text}> Preview </Text>
        </TouchableOpacity>
      </View>
      {
        lyric.split('\n').map( (line, i) => {
          
          return(
            <View key={i}>
              <TextInput
                style={styles.input_style}
                onChangeText= { (text) => {
                  var obj:defaultDict = {  ...chords_lines }
                  let j = text.length-1;
                  while(j>=0 && text[j]==' ') --j;
                  text = text.substring(0, j+1);
                  obj[i] = text
                  setChordsLines(obj);
                }}
                defaultValue={default_text}
              > 
              </TextInput>
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
  input_style:{
    color:'blue',
    borderColor: 'gray', 
    borderWidth: 0.5,
    fontSize:14,
    fontWeight:'bold',
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
    fontSize: 12,
    fontWeight:'bold',
    textAlign:'center',
  }
});
