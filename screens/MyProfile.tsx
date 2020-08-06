import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfileStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export default function SampleScreen({ navigation }: StackScreenProps<ProfileStackParamList, 'MyProfile'>) {
  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <TouchableOpacity onPress={ ()=> navigation.push('Login')}> 
        <Text> Go to Login </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ ()=> navigation.push('Registration')}> 
        <Text> Go to Register </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ ()=> navigation.push('MyChords')}> 
        <Text> Go to MyChords </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ ()=> navigation.push('MyLists')}> 
        <Text> Go to MyLists </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ ()=> navigation.push('WriteChord')}> 
        <Text> Go to WriteChord </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
