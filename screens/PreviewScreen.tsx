import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Music } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import ChordView from "../components/ChordsView";
import useChordsState from "../hooks/useChordsState";
import { Header } from "../components/Header";
import {
  Banner,
  Button,
  HStack,
  Stack,
  Text,
} from "@react-native-material/core";
import { ThemeContext } from "../providers/ThemeProvider";
import { saveMusic } from "../services/musicStorage";
import { RootStackParamList } from "../navigation";
import { Chord } from "../services/chords";

export default function PreviewScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "PreviewScreen">) {
  const {
    lyrics,
    authorName,
    musicName,
    tone: originalTone,
    capo: originalCapo,
  } = route.params;
  const { rawChordList, chordsLines, capo, tone } = useChordsState({
    lyrics,
    originalTone: originalTone,
    originalCapo: originalCapo,
  });

  const errorChords = rawChordList.filter((chord) => !new Chord(chord).valid);
  const { styleSheet: themeStyle, colors: themeColors } =
    React.useContext(ThemeContext);

  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    const music: Music = {
      lyricsWithChords: lyrics,
      author: authorName,
      name: musicName,
      originalTone: originalTone,
      capo: originalCapo,
    };
    try {
      setLoading(true);
      await saveMusic(music);
      setLoading(false);
      Alert.alert("Sucesso", "Cifra salva com sucesso!");
      navigation.push("Root");
    } catch (err) {
      setLoading(false);
      Alert.alert("Erro", "Erro ao salvar cifra!");
    }
  };

  console.log(errorChords);

  return (
    <View>
      <Header
        onPressBackButton={() => navigation.goBack()}
        title={`${authorName} (Pré-visualização)`}
        subTitle={musicName}
      />
      <Button
        disabled={errorChords.length > 0}
        title="Salvar cifra"
        color={themeColors.buttonBackground}
        tintColor={themeColors.buttonTint}
        onPress={handleSave}
      />

      <View style={[themeStyle.content]}>
        {errorChords.length > 0 && (
          <Stack p={10}>
            <Text style={themeStyle.text_primary}>
              As seguintes notas não são válidas:{" "}
              {errorChords.map((chord) => {
                return (
                  <Text
                    style={[
                      themeStyle.chordText,
                      { color: themeColors.chordErrorColor },
                    ]}
                  >
                    {chord}{" "}
                  </Text>
                );
              })}
            </Text>
          </Stack>
        )}
        <ScrollView>
          <Text style={themeStyle.text_primary}>Tom: {tone}</Text>
          <Text style={themeStyle.text_primary}>
            Capotraste: {capo === 0 ? "Sem capotraste\n" : `${capo}ª casa\n`}
          </Text>
          <Stack>
            <ChordView
              highlightInvalidChords={true}
              chordsLines={chordsLines}
            />
            <View style={{ height: 300 }} />
          </Stack>
        </ScrollView>
      </View>
    </View>
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
});
