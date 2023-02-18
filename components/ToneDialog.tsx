import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Chord, noteToNumber } from "../functions/chords";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { ThemeContext } from "../providers/ThemeProvider";

export interface ToneDialogProps {
  onSelectTone?: (tone: string) => void;
  visible?: boolean;
  selectedTone?: string;
  closeDialog?: () => void;
}

const toneLists = [
  ["C", "C#", "D", "D#", "E", "F"],
  ["F#", "G", "G#", "A", "A#", "B"],
];

export default function ToneDialog({
  onSelectTone = () => {},
  visible = false,
  selectedTone = "C",
  closeDialog = () => {},
}: ToneDialogProps) {
  const { chordType } = useLocalConfiguration();
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        style={styles.container}
        onPress={closeDialog}
        activeOpacity={0}
      >
        <View style={styles.modalView}>
          <Text style={styles.h1}> Selecione o tom </Text>
          <View style={styles.separator} />
          {toneLists.map((tones, i) => {
            return (
              <View style={styles.tone_buttons_container} key={i}>
                {tones.map((tone_name, j) => {
                  let idx = i * tones.length + j;
                  return (
                    <TouchableOpacity
                      key={j}
                      style={[
                        styles.circle_button,
                        {
                          backgroundColor:
                            noteToNumber(selectedTone) == idx
                              ? "#2F80ED"
                              : "#BDBDBD",
                        },
                      ]}
                      onPress={() => {
                        onSelectTone(Chord.toChord(tone_name, chordType));
                        closeDialog();
                      }}
                    >
                      <Text
                        style={[
                          themeStyle.h3,
                          themeStyle.bold,
                          { color: "#FFFFFF" },
                        ]}
                      >
                        {tone_name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
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
