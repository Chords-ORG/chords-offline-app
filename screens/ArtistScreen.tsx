import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

// { navigation }: StackScreenProps<RootStackParamList, 'SampleScreen'>
export default function ArtistScreen() {
  return (
    <View style={[styles.container, { width: '100%', height: '100%', padding: 15  }]}>
      <Text> ArtistScreen </Text>
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
