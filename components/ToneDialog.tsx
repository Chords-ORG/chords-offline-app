import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Chord } from "../functions/chords";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { ThemeContext } from "../providers/ThemeProvider";
import { ModalDialogState } from "../hooks/useModalDialogState";
import ModalDialog from "./ModalDialog";
import { Button, Chip, HStack, Stack, Text } from "@react-native-material/core";

export interface ToneDialogProps {
  dialogState: ModalDialogState;
  onSelectTone?: (tone: string) => void;
  selectedTone?: string;
}

const toneLists = [
  ["C", "C#", "D", "D#", "E", "F"],
  ["F#", "G", "G#", "A", "A#", "B"],
];

export default function ToneDialog({
  onSelectTone = () => {},
  selectedTone = "C",
  dialogState,
}: ToneDialogProps) {
  const { chordType } = useLocalConfiguration();
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  return (
    <ModalDialog state={dialogState}>
      <Stack style={[styles.modalView, themeStyle.dialog]} spacing={20}>
        <Text style={{ color: themeStyle.dialog.color }}>Selecione o tom</Text>
        <Stack spacing={10}>
          {toneLists.map((tones, i) => {
            return (
              <HStack key={i} spacing={10}>
                {tones.map((toneName, j) => {
                  const idx = i * tones.length + j;
                  const isSelectedTone =
                    Chord.getChordNumber(selectedTone) === idx;
                  // Fill with spaces
                  return (
                    <Pressable
                      key={j}
                      style={[styles.circle_button, themeStyle.button]}
                      onPress={() => {
                        onSelectTone(Chord.toChord(toneName, chordType));
                        dialogState.hide();
                      }}
                    >
                      <Text
                        style={[
                          themeStyle.h3,
                          themeStyle.bold,
                          themeStyle.button,
                        ]}
                      >
                        {toneName}
                      </Text>
                    </Pressable>
                  );
                })}
              </HStack>
            );
          })}
        </Stack>
      </Stack>
    </ModalDialog>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    //alignItems: "center",
  },
  separator: {
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    height: 10,
  },
  buttons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  h1: {
    color: "#333333",
    fontFamily: "roboto-bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 140,
    borderRadius: 5,
  },
  circle_button: {
    height: 35,
    width: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tone_buttons_container: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000066",
  },
});
