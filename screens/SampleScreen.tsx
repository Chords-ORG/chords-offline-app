import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { Header } from '../components/Header';
import useAdaptativeStyle from '../hooks/useAdaptativeStyle';
import { Button, Divider } from '@react-native-material/core';

// { navigation }: StackScreenProps<RootStackParamList, 'SampleScreen'>
export default function SampleScreen() {
  const basic_style = useAdaptativeStyle();
  
  return (
    <View>
      <Header showBackButton={false} />
      <View style={[basic_style.content, { padding: 10 }]}>
        <Button
          title="Button 1"
          color={basic_style.button.backgroundColor}
          tintColor={basic_style.button.color}
        />

        <Divider style={{ marginVertical: 20 }} leadingInset={16} />

        <Button
          color={basic_style.button.backgroundColor}
          tintColor={basic_style.button.color}
          title="Button 2"
        />
      </View>
    </View>
  );
}