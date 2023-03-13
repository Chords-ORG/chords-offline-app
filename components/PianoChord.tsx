import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../providers/ThemeProvider";
import { Chord } from "../services/chords";
import PianoChordImage from "./PianoChordImage";

export interface PianoChordProps {
  chordName: string;
}

export default function PianoChord({ chordName }: PianoChordProps) {
  const { colors: themeColors } = React.useContext(ThemeContext);

  const pianoChords: Record<
    string,
    string[][]
  > = require("../assets/data/piano_chords.json");

  const sharpChordName = Chord.toChord(chordName, "sharp");
  const fingersPositionsList = pianoChords[sharpChordName];
  const [idx, setIdx] = useState(0);
  if (!fingersPositionsList || fingersPositionsList.length == 0) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={[styles.message, { color: themeColors.textPrimary }]}>
          Acorde Indisponível
        </Text>
      </View>
    );
  } else {
    const tam = fingersPositionsList.length;
    const fingers = fingersPositionsList[idx];
    return (
      <TouchableOpacity onPress={() => setIdx((idx + 1) % tam)}>
        <PianoChordImage fingers={fingers} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 200,
  },
  message: {
    fontFamily: "roboto-bold",
    fontSize: 12,
    textAlign: "center",
  },
});
