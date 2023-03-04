import React from "react";
import { Alert, View } from "react-native";
import { Music } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import ChordView from "../components/ChordsView";
import useChordsState from "../hooks/useChordsState";
import { Header } from "../components/Header";
import { Button, Stack, Text } from "@react-native-material/core";
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
  const { sharpChordList, chordsLines, capo, tone } = useChordsState({
    lyrics,
    originalTone: originalTone,
    originalCapo: originalCapo,
  });

  const errorChords = sharpChordList.filter((chord) => !new Chord(chord).valid);
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
