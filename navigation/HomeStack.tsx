import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, Image, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";

export type HomeStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  title: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "raleway",
  },
});
