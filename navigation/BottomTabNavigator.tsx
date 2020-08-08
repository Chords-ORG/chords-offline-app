import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { BottomTabParamList } from '../types';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchStack}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStack}
      />
    </BottomTab.Navigator>
  );
}