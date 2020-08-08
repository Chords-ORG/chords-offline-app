import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

// 
export default function VersionScreen({ navigation }: StackScreenProps<SearchStackParamList, 'ChoseVersion'>) {
  return (
    <View style={[styles.container, { width: '100%', height: '100%', padding: 15  }]}>
      <Text> ChoseVersion </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }
});
