import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Divider } from "@react-native-material/core";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const basic_style = useAdaptativeStyle();
  return (
    <View
      style={[
        basic_style.container,
        { width: "100%", height: "100%", padding: 15 },
      ]}
    >
      <Button
        title="ChordScreen"
        color={basic_style.active_color.color}
        tintColor={basic_style.tint_color.color}
        onPress={() => {
          navigation.navigate("ChordScreen", { chord_id: 1 });
        }}
      />

      <Divider style={{ marginVertical: 20 }} leadingInset={16} />

      <Button
        color={basic_style.active_color.color}
        tintColor={basic_style.tint_color.color}
        title="WriteChordScreen"
        onPress={() => {
          navigation.navigate("WriteChordScreen");
        }}
      />
    </View>
  );
}