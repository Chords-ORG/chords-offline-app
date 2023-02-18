import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
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
import { Button, Spacer, Stack } from "@react-native-material/core";
import { Chord } from "../functions/chords";
import useLocalConfiguration from "../hooks/useLocalConfiguration";

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

  const { rawChordList, chordsLines, capo, setCapo, tone, setTone } =
    useChordsState({ lyrics, originalTone: "B" });
  const chordsImagesState = useChordsImageState(rawChordList);
  const { chordType } = useLocalConfiguration();

  const capoDialogState = useModalDialogState();
  const toneDialogState = useModalDialogState();

  return (
    <>
      <CapoDialog
        dialogState={capoDialogState}
        selectedCapo={capo}
        tone={tone}
        onSelect={setCapo}
      />
      <ToneDialog
        dialogState={toneDialogState}
        selectedTone={tone}
        onSelectTone={(value) => {
          setTone(value);
        }}
      />
      <Header
        onPressBackButton={navigation.goBack}
        title="Leão"
        subTitle="Marília Mendonça"
      />
      <View style={[themeStyle.content, styles.content]}>
        <ChordsImages state={chordsImagesState} selectedCapo={capo}/>
        <View style={themeStyle.horizontal_separator} />
        <View>
          <Stack spacing={2}>
            <Button
              title="Tom"
              onPress={() => {
                toneDialogState.show();
              }}
              trailing={
                <Text style={{ color: themeStyle.button.color }}>
                  {Chord.toChord(tone, chordType)}
                </Text>
              }
              color={themeStyle.button.backgroundColor}
              tintColor={themeStyle.button.color}
              compact
            />
            <Spacer />
            <Button
              onPress={() => {
                capoDialogState.show();
              }}
              title="Capostraste"
              trailing={
                <Text style={{ color: themeStyle.button.color }}>
                  {capo == 0 ? "Sem Capo" : `${capo}ª casa`}{" "}
                </Text>
              }
              color={themeStyle.button.backgroundColor}
              tintColor={themeStyle.button.color}
              compact
            />
          </Stack>
          <ScrollView>
            <Stack>
              <ChordView
                chordsLines={chordsLines}
                onPressNote={(chordName) =>
                  chordsImagesState.scrollToChord(chordName)
                }
              />
              <View style={{ height: 300 }} />
            </Stack>
          </ScrollView>
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
