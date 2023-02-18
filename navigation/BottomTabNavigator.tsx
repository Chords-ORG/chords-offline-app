import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { BottomTabParamList } from "../types";
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";
import { Image } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";
import { Icon } from "@react-native-material/core";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const { styleSheet: themeStyle, theme } = React.useContext(ThemeContext);
  const lightTheme = theme === "light";
  const activeTintColor = lightTheme ? "#2F80ED" : "#FFFFFF";
  const inactiveTintColor = lightTheme ? "#828282" : "#BDBDBD";

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: activeTintColor,
        inactiveTintColor: inactiveTintColor,
        activeBackgroundColor: themeStyle.bottom_tab.backgroundColor,
        inactiveBackgroundColor: themeStyle.bottom_tab.backgroundColor,
        style: {
          borderTopWidth: 0,
          shadowColor: themeStyle.bottom_tab.shadowColor,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              size={30}
              color={focused ? activeTintColor : inactiveTintColor}
              name="home"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              size={30}
              color={focused ? activeTintColor : inactiveTintColor}
              name="apple-keyboard-option"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
