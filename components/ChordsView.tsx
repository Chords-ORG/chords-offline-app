import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ChordLineType } from "../types";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { Chord } from "../functions/chords";
import {
  Button,
  HStack,
  Icon,
  Spacer,
  Stack,
} from "@react-native-material/core";
import { ThemeContext } from "../providers/ThemeProvider";

interface ChordViewProps {
  chordsLines?: ChordLineType[];
  onPressTone?: () => void;
  selectedTone?: string;
  onPressCapo?: () => void;
  selectedCapo?: number;
  onPressNote?: (note: string) => void;
}

export default function ChordView({
  chordsLines = [],
  selectedTone = "C",
  selectedCapo = 0,
  onPressTone = () => {},
  onPressCapo = () => {},
  onPressNote = () => {},
}: ChordViewProps) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
  const { chordType } = useLocalConfiguration();

  return (
    <ScrollView>
      <Stack>
        <Stack spacing={2}>
          <Button
            title="Tom"
            onPress={onPressTone}
            trailing={
              <Text style={{ color: themeStyle.button.color }}>
                {Chord.toChord(selectedTone, chordType)}
              </Text>
            }
            color={themeStyle.button.backgroundColor}
            tintColor={themeStyle.button.color}
            compact
          />
          <Spacer></Spacer>
          <Button
            onPress={onPressCapo}
            title="Capostraste"
            trailing={
              <Text style={{ color: themeStyle.button.color }}>
                {selectedCapo == 0 ? "Sem Capo" : `${selectedCapo}ª casa`}{" "}
              </Text>
            }
            color={themeStyle.button.backgroundColor}
            tintColor={themeStyle.button.color}
            compact
          />
        </Stack>
        <View style={{ marginTop: 20 }}>
          {chordsLines.map((chord_line: ChordLineType, i) => (
            <View key={i}>
              <View style={{ flexDirection: "row" }}>
                {chord_line.chords_line.split(" ").map((chord_name, i) => {
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
              <Text
                style={[
                  styles.lyrics_text,
                  themeStyle.text_primary,
                  { fontFamily: "monospace" },
                ]}
              >
                {chord_line.music_line}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ height: 300 }} />
      </Stack>
    </ScrollView>
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
