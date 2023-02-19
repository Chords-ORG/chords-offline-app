import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/SettingsScreen";

export type SettingsStackParamList = {
  Settings: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
