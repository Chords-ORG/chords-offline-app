import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import ChordScreen from "../screens/ChordScreen";
import WriteChordScreen from "../screens/WriteChordScreen";
import PreviewScreen from "../screens/PreviewScreen";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Navigation() {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons }>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </IconComponentProvider>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="ChordScreen" component={ChordScreen} />
      <Stack.Screen name="WriteChordScreen" component={WriteChordScreen} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
    </Stack.Navigator>
  );
}
