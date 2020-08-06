import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfileStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export default function SampleScreen({ navigation }: StackScreenProps<ProfileStackParamList, 'MyLists'>) {
  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <Text> MyLists </Text>
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
