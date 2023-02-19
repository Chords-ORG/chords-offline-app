import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ChordLineType } from "../types";
import { ThemeContext } from "../providers/ThemeProvider";
import { Chord } from "../services/chords";

interface ChordViewProps {
  chordsLines?: ChordLineType[];
  onPressNote?: (note: string) => void;
  highlightInvalidChords?: boolean;
}

export default function ChordView({
  chordsLines = [],
  onPressNote = () => {},
  highlightInvalidChords = false,
}: ChordViewProps) {
  const { styleSheet: themeStyle, colors: themeColors } =
    React.useContext(ThemeContext);

  return (
    <View>
      {chordsLines.map((chord_line: ChordLineType, i) => (
        <View key={i}>
          <View style={{ flexDirection: "row" }}>
            {chord_line.chordsLine.split(" ").map((chordName, i) => {
              const chordIsValid = new Chord(chordName).valid;
              const chordColor =
                !highlightInvalidChords || chordIsValid
                  ? themeColors.chordColor
                  : themeColors.chordErrorColor;

              console.log("chordName", chordName);
              console.log("chordIsValid", chordIsValid);
              console.log("chordColor", chordColor);

              return chordName == "" ? (
                <View key={i}>
                  <Text style={[styles.chordText]}> </Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => onPressNote(chordName)}
                  key={i}
                >
                  <Text style={[styles.chordText, { color: chordColor }]}>
                    {chordName}{" "}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text
            style={[
              styles.lyrics_text,
              themeStyle.text_primary,
              { fontFamily: "monospace" },
            ]}
          >
            {chord_line.musicLine}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chordText: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
  },
  lyrics_text: {
    fontFamily: "monospace",
    fontSize: 14,
  },
});
