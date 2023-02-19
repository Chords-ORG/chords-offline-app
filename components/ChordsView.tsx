import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ChordLineType } from "../types";
import { ThemeContext } from "../providers/ThemeProvider";

interface ChordViewProps {
  chordsLines?: ChordLineType[];
  onPressNote?: (note: string) => void;
}

export default function ChordView({
  chordsLines = [],
  onPressNote = () => {},
}: ChordViewProps) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  return (
    <View>
      {chordsLines.map((chord_line: ChordLineType, i) => (
        <View key={i}>
          <View style={{ flexDirection: "row" }}>
            {chord_line.chords_line !== "" &&
              chord_line.chords_line.split(" ").map((chord_name, i) => {
                return chord_name == "" ? (
                  <View key={i}>
                    <Text
                      style={[styles.chord_text, themeStyle.text_highlight]}
                    >
                      {" "}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => onPressNote(chord_name)}
                    key={i}
                  >
                    <Text
                      style={[
                        themeStyle.h3,
                        themeStyle.active_color,
                        themeStyle.bold,
                        { fontFamily: "monospace" },
                      ]}
                    >
                      {chord_name}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          {chord_line.music_line !== "" && (
            <Text
              style={[
                styles.lyrics_text,
                themeStyle.text_primary,
                { fontFamily: "monospace" },
              ]}
            >
              {chord_line.music_line}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chord_text: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
  },
  lyrics_text: {
    fontFamily: "monospace",
    fontSize: 14,
  },
});
