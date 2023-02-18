import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Divider } from "@react-native-material/core";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";
import { Header } from "../components/Header";

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const { styleSheet: basic_style } = useAdaptativeStyle();

  return (
    <View>
      <Header showBackButton={false} />
      <View style={[basic_style.content, { padding: 10 }]}>
        <Button
          title="Cifra de exemplo"
          color={basic_style.button.backgroundColor}
          tintColor={basic_style.button.color}
          onPress={() => {
            navigation.navigate("ChordScreen", { chord_id: 1 });
          }}
        />

        <Divider style={{ marginVertical: 20 }} leadingInset={16} />

        <Button
          color={basic_style.button.backgroundColor}
          tintColor={basic_style.button.color}
          title="Escrever cifra"
          onPress={() => {
            navigation.navigate("WriteChordScreen");
          }}
        />
      </View>
    </View>
  );
}
