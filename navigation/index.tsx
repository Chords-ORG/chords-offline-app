import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/SampleScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import ChordScreen from '../screens/ChordScreen'
import CreateChordScreen from '../screens/CreateChordScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ArtistScreen from '../screens/ArtistScreen'
import VersionStack from './VersionStack'
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}


const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="ChordScreen" component={ChordScreen} />
      <Stack.Screen name="CreateChordScreen" component={CreateChordScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
      <Stack.Screen name="VersionStack" component={VersionStack} />
    </Stack.Navigator>
  );
}
