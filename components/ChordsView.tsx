import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ChordLineType } from "../types";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { Chord } from "../functions/chords";

interface ChordViewProps {
  chordsLines?: ChordLineType[];
  musicName?: string;
  artistName?: string;
  onPressTone?: () => void;
  selectedTone?: string;
  onPressCapo?: () => void;
  selectedCapo?: number;
  onPressNote?: (note: string) => void;
}

export default function ChordView({
  chordsLines = [],
  musicName = "",
  artistName = "",
  selectedTone = "C",
  selectedCapo = 0,
  onPressTone = () => {},
  onPressCapo = () => {},
  onPressNote = () => {},
}: ChordViewProps) {
  const basic_style = useAdaptativeStyle();
  const { chordType } = useLocalConfiguration();

  return (
    <ScrollView>
      <View style={styles.header_container}>
        <View style={styles.left}>
          <Text
            style={[
              basic_style.h2,
              basic_style.primary_color,
              basic_style.bold,
            ]}
          >
            {musicName}
          </Text>
          <Text style={[basic_style.h3, basic_style.secondary_color]}>
            {artistName}
          </Text>
        </View>
      </View>
      <View style={styles.tone_container}>
        <TouchableOpacity onPress={onPressTone}>
          <Text
            style={[
              basic_style.h3,
              basic_style.primary_color,
              basic_style.bold,
            ]}
          >
            Tom:{" "}
            <Text style={basic_style.active_color}>
              {Chord.toChord(selectedTone, chordType)}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("onPressCapo");
            onPressCapo();
          }}
        >
          <Text
            style={[
              basic_style.h3,
              basic_style.primary_color,
              basic_style.bold,
            ]}
          >
            Capotraste:{" "}
            <Text style={basic_style.active_color}>
              {selectedCapo == 0 ? "Sem Capo" : `${selectedCapo}ª casa`}{" "}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        {chordsLines.map((chord_line: ChordLineType, i) => (
          <View key={i}>
            <View style={{ flexDirection: "row" }}>
              {chord_line.chords_line.split(" ").map((chord_name, i) => {
                return chord_name == "" ? (
                  <View key={i}>
                    <Text
                      style={[
                        basic_style.h3,
                        basic_style.active_color,
                        basic_style.bold,
                        { fontFamily: "monospace" },
                      ]}
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
                        basic_style.h3,
                        basic_style.active_color,
                        basic_style.bold,
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
                basic_style.h3,
                basic_style.primary_color,
                { fontFamily: "monospace" },
              ]}
            >
              {chord_line.music_line}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ height: 300 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chord_container: {
    alignItems: "center",
    marginRight: 20,
  },
  left: {
    flex: 2,
  },
  header_container: {
    flexDirection: "row",
    paddingTop: 10,
  },
  tone_container: {
    paddingTop: 20,
  },
});
