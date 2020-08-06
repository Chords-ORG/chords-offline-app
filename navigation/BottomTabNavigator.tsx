import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import SampleScreen from '../screens/SampleScreen';
import { BottomTabParamList } from '../types';
import ProfileStack from './ProfileStack';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Search"
        component={ SampleScreen }
      />
      <BottomTab.Screen
        name="Profile"
        component={ ProfileStack }
      />
      <BottomTab.Screen
        name="Settings"
        component={ SampleScreen }
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}