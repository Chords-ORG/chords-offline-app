import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Animated, Platform } from 'react-native';
import { HomeStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

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
      <ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
