import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { BottomTabParamList } from '../types';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';
import { Image, Text, View } from 'react-native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator 
      tabBarOptions={{
        activeTintColor: '#2F80ED',
        inactiveTintColor: '#828282',
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => HomeIcon(focused)
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused}) => SearchIcon(focused)
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => ProfileIcon(focused)
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({focused}) => SettingsIcon(focused)
        }}
      />
    </BottomTab.Navigator>
  );
}
const icon_style = { height:25, width:25 }

function HomeIcon(focused:boolean){
  let gray = require('../assets/images/home_icon_gray.png')
  let blue = require('../assets/images/home_icon_blue.png')
    return(
      <Image
        style = {icon_style}
        source = {( focused ? blue : gray )}
      />
    )
}

function SearchIcon(focused:boolean){
  let gray = require('../assets/images/search_icon_gray.png')
  let blue = require('../assets/images/search_icon_blue.png')
    return(
      <Image
        style = {icon_style}
        source = {( focused ? blue : gray )}
      />
    )
}

function ProfileIcon(focused:boolean){
  let gray = require('../assets/images/profile_icon_gray.png')
  let blue = require('../assets/images/profile_icon_blue.png')
    return(
      <Image
        style = {icon_style}
        source = {( focused ? blue : gray )}
      />
    )
}

function SettingsIcon(focused:boolean){
  let gray = require('../assets/images/settings_icon_gray.png')
  let blue = require('../assets/images/settings_icon_blue.png')
    return(
      <Image
        style = {icon_style}
        source = {( focused ? blue : gray )}
      />
    )
}