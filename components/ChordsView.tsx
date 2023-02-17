import React, { useState, version } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ChordLineType, SpinnerPropsType } from "../types";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";
import useChordsLines from "../hooks/useChordsLines";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { Chord } from "../functions/chords";

interface ChordViewProps {
  chords?: string;
  musicName?: string;
  artistName?: string;
  onPressTone?: () => void;
  selectedTone?: string;
  onPressCapo?: () => void;
  selectedCapo?: number;
  onPressNote?: (note: string) => void;
}

export default function ChordView({
  chords = '',
  musicName = '',
  artistName = '',
  selectedTone = 'C',
  selectedCapo = 0,
  onPressTone = () => { },
  onPressCapo = () => { },
  onPressNote = () => { },
}: ChordViewProps) {
  const basic_style = useAdaptativeStyle();
  const { chordType, defaultCapo, instrument } = useLocalConfiguration();
  const chords_lines = useChordsLines(chords);
  console.log(chords_lines)

  const getNote = (tone: string) => {
    return chordType === "sharp"
      ? new Chord(tone).toSharp()
      : new Chord(tone).toBemol();
  };

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
              {getNote(selectedTone)}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCapo}>
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
        {chords_lines.map((chord_line: ChordLineType, i) => (
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
                      {getNote(chord_name)}{" "}
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
  chords_container: {
    flexDirection: "row",
    paddingBottom: 10,
    //height: 170,
  },
  chord_container: {
    alignItems: "center",
    marginRight: 20,
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
  tone_container: {
    paddingTop: 20,
  }
});
