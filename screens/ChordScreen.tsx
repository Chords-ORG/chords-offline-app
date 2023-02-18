import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import Spinner from "../components/Spinner";
import CapoDialog from "../components/CapoDialog";
import ChordView from "../components/ChordsView";
import useChordsImageState from "../hooks/useChordsImageState";
import ChordsImages from "../components/ChordsImages";
import useChordsState from "../hooks/useChordsState";
import ToneDialog from "../components/ToneDialog";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";
import { Header } from "../components/Header";

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
  const { styleSheet: basic_style } = useAdaptativeStyle();
  const [loading, setLoading] = useState(false);
  const [capoDialogVisible, setCapoDialogVisible] = useState(false);
  const [toneDialogVisible, setToneDialogVisible] = useState(false);

  const { rawChordList, chordsLines, capo, setCapo, tone, setTone } =
    useChordsState({ lyrics, originalTone: "B" });
  const chordsImagesState = useChordsImageState(rawChordList);

  return (
    <>
      <Spinner visible={loading} />
      <CapoDialog
        visible={capoDialogVisible}
        closeDialog={() => setCapoDialogVisible(false)}
        selected_capo={capo}
        tone={tone}
        onSelect={(value, delta) => {
          setCapo(value);
          setCapoDialogVisible(false);
        }}
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

      <View style={[basic_style.content, styles.content]}>
        <ChordsImages state={chordsImagesState} />
        <View style={basic_style.horizontal_separator} />
        <View>
          <ChordView
            chordsLines={chordsLines}
            selectedTone={tone}
            selectedCapo={capo}
            onPressTone={() => {
              setToneDialogVisible(true);
            }}
            onPressCapo={() => {
              setCapoDialogVisible(true);
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
