import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { BottomTabParamList } from "../types";
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";
import { Image } from "react-native";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const basic_style = useAdaptativeStyle();
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: "#2F80ED",
        inactiveTintColor: "#828282",
        activeBackgroundColor: basic_style.bottom_tab.backgroundColor,
        inactiveBackgroundColor: basic_style.bottom_tab.backgroundColor,
        style: {
          borderTopWidth: 0,
          shadowColor: basic_style.bottom_tab.shadowColor,
        },
        
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => HomeIcon(focused),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => SettingsIcon(focused),
        }}
      />
    </BottomTab.Navigator>
  );
}
const icon_style = { height: 25, width: 25 };

function HomeIcon(focused: boolean) {
  let gray = require("../assets/images/home_icon_gray.png");
  let blue = require("../assets/images/home_icon_blue.png");
  return <Image style={icon_style} source={focused ? blue : gray} />;
}

function SettingsIcon(focused: boolean) {
  let gray = require("../assets/images/settings_icon_gray.png");
  let blue = require("../assets/images/settings_icon_blue.png");
  return <Image style={icon_style} source={focused ? blue : gray} />;
}
