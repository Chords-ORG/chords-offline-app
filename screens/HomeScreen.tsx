import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { light_style } from '../constants/Styles'

export default function HomeScreen({ navigation, route }: StackScreenProps<RootStackParamList>) {

  const [basic_style, setBasicStyle] = useState(light_style);

  return (
    <View style={[basic_style.container, { width: '100%', height: '100%', padding: 15 }]}>
      <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChordScreen', { chord_id: 1 })
          }}
        >
          <Text>Chord page</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  left: {
    flex: 1
  },
  right: {
    flex: 1,
  }
});
