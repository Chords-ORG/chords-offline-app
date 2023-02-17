import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  ProfileStackParamList,
  RootStackParamList,
  defaultDict,
} from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { TextInput, ScrollView } from "react-native-gesture-handler";

export default function WriteChordScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const [authorName, setAuthorName] = useState("");
  const [musicName, setMusicName] = useState("");
  const [tone, setTone] = useState("C");
  const [capo, setCapo] = useState("0");
  const [lyrics, setLyrics] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.button_container}
          onPress={() =>
            navigation.push("PreviewScreen", {
              lyrics,
              musicName,
              authorName,
              tone,
              capo: parseInt(capo)
            })
          }
        >
          <Text style={styles.button_text}> Preview </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.label}> Author Name </Text>
        <TextInput
          style={styles.input_style}
          onChangeText={(text) => setAuthorName(text)}
          value={authorName}
        />
      </View>
      <View>
        <Text style={styles.label}> Music Name </Text>
        <TextInput
          style={styles.input_style}
          onChangeText={(text) => setMusicName(text)}
          value={musicName}
        />
      </View>
      <View>
        <Text style={styles.label}> Tone </Text>
        <TextInput
          style={styles.input_style}
          onChangeText={(text) => setTone(text)}
          value={tone}
        />
      </View>
      <View>
        <Text style={styles.label}> Capo </Text>
        <TextInput
          style={styles.input_style}
          onChangeText={(text) => setCapo(text)}
          value={capo}
        />
      </View>

      <View>
        <Text style={styles.label}> Lyrics </Text>
        <TextInput
          multiline={true}
          style={styles.input_style}
          onChangeText={(text) => setLyrics(text)}
          value={lyrics}
          
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  lyric_text: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  input_style: {
    color: "blue",
    borderColor: "gray",
    borderWidth: 0.5,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "monospace",
    alignContent: 'flex-start'
  },
  button_container: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#2F80ED",
    width: 100,
    height: 30,
    margin: 20,
    borderRadius: 5,
  },
  button_text: {
    color: "#F2F2F2",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
});
