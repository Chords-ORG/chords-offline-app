import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Animated, Platform } from 'react-native';
import { HomeStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HEADER_MAX_HEIGHT = 150.0;
const HEADER_MIN_HEIGHT = 10.0;

function getHeaderHeigh(scrollY: number) {
  let res = HEADER_MAX_HEIGHT - scrollY;
  res = Math.max(res, HEADER_MAX_HEIGHT)
  res = Math.min(res, HEADER_MIN_HEIGHT)
  return res;
}
export default function HomeScreen({ navigation, route }: StackScreenProps<HomeStackParamList, 'Home'>) {
  const [headerHeight, setHeaderHeight] = useState(HEADER_MAX_HEIGHT);

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Home', { headerHeight: 10 })}>
        <Text> Butão </Text>
      </TouchableOpacity>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(obj) => {
          let new_height = getHeaderHeigh(obj.nativeEvent.contentOffset.y)
          console.log('new_height', new_height)
          if(new_height) navigation.setParams({ headerHeight: new_height })
          console.log('headerHeight', route.params.headerHeight)
        }
        }>
        <View style={[styles.container, { height: 1000000 }]} />

      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
