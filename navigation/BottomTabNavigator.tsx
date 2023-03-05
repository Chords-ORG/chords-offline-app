import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { Icon } from "@react-native-material/core";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Settings: undefined;
};

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
        component={HomeScreen}
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
        component={SettingsScreen}
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
