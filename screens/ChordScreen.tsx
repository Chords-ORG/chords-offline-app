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
      <Header onPressBackButton={navigation.goBack} />

      <View
        style={[
          basic_style.content,
          { padding: 15, width: "100%", height: "100%" },
        ]}
      >
        <ChordsImages state={chordsImagesState} />
        <View style={basic_style.horizontal_separator} />
        <View>
          <ChordView
            chordsLines={chordsLines}
            musicName="Leão"
            authorName="Marília Mendonça"
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
  container: {
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    height: 85,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 35,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: "#000",
    justifyContent: "space-between",
    //borderBottomWidth:1,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  chords_container: {
    flexDirection: "row",
    paddingBottom: 10,
    //height: 170,
  },
  arrow_icon: {
    height: 13,
    width: 20,
    alignSelf: "center",
  },
  chord_container: {
    alignItems: "center",
    marginRight: 20,
  },
  arrow_container: {
    width: "100%",
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 1,
  },
  header_container: {
    flexDirection: "row",
    paddingTop: 10,
  },
  options_button: {
    alignSelf: "center",
  },
  tone_container: {
    paddingTop: 20,
  },
});
