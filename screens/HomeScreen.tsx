import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Divider } from "@react-native-material/core";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const { styleSheet: themeStyle }  = React.useContext(ThemeContext)
  return (
    <View>
      <Header showBackButton={false} />
      <View style={[themeStyle.content, { padding: 10 }]}>
        <Button
          title="Cifra de exemplo"
          color={themeStyle.button.backgroundColor}
          tintColor={themeStyle.button.color}
          onPress={() => {
            navigation.navigate("ChordScreen", { chord_id: 1 });
          }}
        />

        <Divider style={{ marginVertical: 20 }} leadingInset={16} />

        <Button
          color={themeStyle.button.backgroundColor}
          tintColor={themeStyle.button.color}
          title="Escrever cifra"
          onPress={() => {
            navigation.navigate("WriteChordScreen");
          }}
        />
      </View>
    </View>
  );
}
