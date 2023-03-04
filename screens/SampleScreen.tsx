import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../components/Header";
import { Button, Divider } from "@react-native-material/core";
import { ThemeContext } from "../providers/ThemeProvider";

// { navigation }: StackScreenProps<RootStackParamList, 'SampleScreen'>
export default function SampleScreen() {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  return (
    <View>
      <Header showBackButton={false} />
      <View style={[themeStyle.content, { padding: 10 }]}>
        <Button
          title="Button 1"
          color={themeStyle.button.backgroundColor}
          tintColor={themeStyle.button.color}
        />

        <Divider style={{ marginVertical: 20 }} leadingInset={16} />

        <Button
          color={themeStyle.button.backgroundColor}
          tintColor={themeStyle.button.color}
          title="Button 2"
        />
      </View>
    </View>
  );
}
