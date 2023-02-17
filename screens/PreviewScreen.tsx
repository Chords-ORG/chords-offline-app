import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { ProfileStackParamList, RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import ChordView from "../components/ChordsView";
import useChordsState from "../hooks/useChordsState";

export default function PreviewScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "PreviewScreen">) {
  const { lyrics, artistName, musicName, tone:originalTone, capo:originalCapo } = route.params;
  const { chordsLines, capo, setCapo, tone, setTone } =
    useChordsState({ lyrics, originalTone: originalTone, originalCapo: originalCapo });

  const up_arrow = require("../assets/images/up_arrow.png");
  const down_arrow = require("../assets/images/down_arrow.png");

  const [show_menu, setMenu] = useState(true);

  return (
    <ScrollView style={[styles.container, { padding: 10 }]}>
      <ChordView
        chordsLines={chordsLines}
        musicName={musicName}
        artistName={artistName}
        selectedTone={tone}
        selectedCapo={capo}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  lyric_text: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  option_container: {
    marginRight: 20,
  },
  label: {
    fontSize: 14,
  },
  button_container: {
    justifyContent: "center",
    backgroundColor: "#2F80ED",
    width: 120,
    height: 40,
    borderRadius: 5,
    marginTop: 2,
  },
  button_text: {
    color: "#F2F2F2",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  chord_text: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  separator: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#828282",
  },
  arrow: {
    height: 13,
    width: 20,
    marginTop: 5,
  },
  like_icon: {
    height: 30,
    width: 30,
    marginRight: 20,
    marginTop: 10,
  },
});
