import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import CapoDialog from "../components/CapoDialog";
import ChordView from "../components/ChordsView";
import useChordsImageState from "../hooks/useChordsImageState";
import ChordsImages from "../components/ChordsImages";
import useChordsState from "../hooks/useChordsState";
import ToneDialog from "../components/ToneDialog";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";
import useModalDialogState from "../hooks/useModalDialogState";

const lyrics = `
[Intro]  
B  F# A#  D#m

B  F# A#  D#m


[Primeira Parte]
 B                  F#
Que o Sol da manhã te dissolva
  A#                  D#m
Seu vampiro de filmes pastelão
B                   F#
Mas quem vai nos julgar?
   A#           D#m
Sou seu despenteado leão`;

export default function ChordScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "ChordScreen">) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
  const [toneDialogVisible, setToneDialogVisible] = useState(false);

  const { rawChordList, chordsLines, capo, setCapo, tone, setTone } =
    useChordsState({ lyrics, originalTone: "B" });
  const chordsImagesState = useChordsImageState(rawChordList);

  const capoDialogState = useModalDialogState();

  return (
    <>
      <CapoDialog
        dialogState={capoDialogState}
        selectedCapo={capo}
        tone={tone}
        onSelect={setCapo}
      />
      <ToneDialog
        visible={toneDialogVisible}
        selectedTone={tone}
        onSelectTone={(value) => {
          setTone(value);
        }}
        closeDialog={() => setToneDialogVisible(false)}
      />
      <Header
        onPressBackButton={navigation.goBack}
        title="Leão"
        subTitle="Marília Mendonça"
      />

      <View style={[themeStyle.content, styles.content]}>
        <ChordsImages state={chordsImagesState} />
        <View style={themeStyle.horizontal_separator} />
        <View>
          <ChordView
            chordsLines={chordsLines}
            selectedTone={tone}
            selectedCapo={capo}
            onPressTone={() => {
              setToneDialogVisible(true);
            }}
            onPressCapo={() => {
              capoDialogState.show();
            }}
            onPressNote={(chordName) =>
              chordsImagesState.scrollToChord(chordName)
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 5,
  },
});
