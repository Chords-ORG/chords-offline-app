import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VersionStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

// 
export default function PreviewVersion({ navigation }: StackScreenProps<VersionStackParamList, 'PreviewVersion'>) {
  return (
    <View style={[styles.container, { width: '100%', height: '100%', padding: 15  }]}>
      <Text> PreviewVersion </Text>
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
