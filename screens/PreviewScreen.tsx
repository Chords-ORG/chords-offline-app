import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import ChordView from "../components/ChordsView";
import useChordsState from "../hooks/useChordsState";
import { Header } from "../components/Header";
import { Button } from "@react-native-material/core";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";

export default function PreviewScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "PreviewScreen">) {
  const {
    lyrics,
    authorName,
    musicName,
    tone: originalTone,
    capo: originalCapo,
  } = route.params;
  const { chordsLines, capo, setCapo, tone, setTone } = useChordsState({
    lyrics,
    originalTone: originalTone,
    originalCapo: originalCapo,
  });

  const basic_style = useAdaptativeStyle();

  const handleSave = () => {
    navigation.push("Root");
  };
  return (
    <View>
      <Header
        onPressBackButton={() => navigation.goBack()}
        title="Pré-visualização"
      />
      <Button
        title="Salvar cifra"
        color={basic_style.active_color.color}
        tintColor={basic_style.tint_color.color}
        onPress={handleSave}
      />
      <ScrollView style={[styles.container, { padding: 10 }]}>
        <ChordView
          chordsLines={chordsLines}
          musicName={musicName}
          authorName={authorName}
          selectedTone={tone}
          selectedCapo={capo}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  lyric_text: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  option_container: {
    marginRight: 20,
  },
  label: {
    fontSize: 14,
  },
  button_container: {
    justifyContent: "center",
    backgroundColor: "#2F80ED",
    width: 120,
    height: 40,
    borderRadius: 5,
    marginTop: 2,
  },
  button_text: {
    color: "#F2F2F2",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
